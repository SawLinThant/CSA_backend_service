import { logger } from '../../../core/logging/logger';
import prisma from '../../../infrastructure/db/prismaClient';
import cron from 'node-cron';
import { GenerateDueSubscriptionOrdersUseCase } from '../useCases/GenerateDueSubscriptionOrdersUseCase';

const generateDueSubscriptionOrdersUseCase = new GenerateDueSubscriptionOrdersUseCase();
const DEFAULT_LOCK_KEY = 900017;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withDistributedLock<T>(lockKey: number, fn: () => Promise<T>): Promise<T | null> {
  const lockRows = await prisma.$queryRaw<Array<{ pg_try_advisory_lock: boolean }>>`
    SELECT pg_try_advisory_lock(${lockKey})
  `;
  const acquired = lockRows[0]?.pg_try_advisory_lock === true;
  if (!acquired) return null;

  try {
    return await fn();
  } finally {
    await prisma.$queryRaw`SELECT pg_advisory_unlock(${lockKey})`;
  }
}

async function runWithRetry(args: {
  batchSize: number;
  maxRetries: number;
  retryBaseMs: number;
}): Promise<void> {
  let attempt = 0;
  while (true) {
    attempt += 1;
    try {
      await runReservationOrderCycle(args.batchSize, attempt);
      return;
    } catch (error) {
      if (attempt > args.maxRetries) throw error;
      const waitMs = args.retryBaseMs * Math.pow(2, attempt - 1);
      logger.info('Reservation worker cycle retry scheduled', {
        attempt,
        maxRetries: args.maxRetries,
        waitMs,
        err: error instanceof Error ? error.message : String(error),
      });
      await sleep(waitMs);
    }
  }
}

export async function runReservationOrderCycle(limit = 100, attempt = 1) {
  const result = await generateDueSubscriptionOrdersUseCase.execute(new Date(), limit, attempt);
  logger.info('Reservation order worker cycle completed', {
    scanned: result.scanned,
    created: result.created,
    skipped: result.skipped,
    failed: result.failed,
    attempt,
    referenceDate: result.referenceDate.toISOString(),
  });
}

export function startReservationOrderWorker(config?: {
  intervalMs?: number;
  cronExpression?: string;
  timezone?: string;
  batchSize?: number;
  maxRetries?: number;
  retryBaseMs?: number;
  distributedLockKey?: number;
}) {
  const batchSize = Number.isFinite(config?.batchSize) && (config?.batchSize ?? 0) > 0 ? (config?.batchSize as number) : 100;
  const maxRetries = Number.isFinite(config?.maxRetries) && (config?.maxRetries ?? 0) >= 0 ? (config?.maxRetries as number) : 3;
  const retryBaseMs =
    Number.isFinite(config?.retryBaseMs) && (config?.retryBaseMs ?? 0) > 0 ? (config?.retryBaseMs as number) : 1000;
  const lockKey =
    Number.isFinite(config?.distributedLockKey) && (config?.distributedLockKey ?? 0) > 0
      ? (config?.distributedLockKey as number)
      : DEFAULT_LOCK_KEY;

  let inProgress = false;
  const runOnce = async () => {
    if (inProgress) {
      logger.info('Reservation worker trigger skipped: previous run still in progress');
      return;
    }
    inProgress = true;
    const startedAt = Date.now();
    try {
      const result = await withDistributedLock(lockKey, async () => {
        await runWithRetry({ batchSize, maxRetries, retryBaseMs });
        return true;
      });
      if (result === null) {
        logger.info('Reservation worker skipped: lock already held by another runner', { lockKey });
      }
    } catch (error) {
      logger.error('Reservation worker cycle failed', {
        err: error instanceof Error ? error.message : String(error),
      });
    } finally {
      inProgress = false;
      logger.info('Reservation worker trigger finished', {
        elapsedMs: Date.now() - startedAt,
        batchSize,
      });
    }
  };

  if (config?.cronExpression) {
    const task = cron.schedule(config.cronExpression, () => {
      void runOnce();
    }, config.timezone ? { timezone: config.timezone } : undefined);
    task.start();
    logger.info('Reservation worker started with cron schedule', {
      cronExpression: config.cronExpression,
      timezone: config.timezone ?? null,
      batchSize,
      maxRetries,
      retryBaseMs,
      lockKey,
    });
    return () => task.stop();
  }

  const intervalMs =
    Number.isFinite(config?.intervalMs) && (config?.intervalMs ?? 0) > 0 ? (config?.intervalMs as number) : 60_000;
  const timer = setInterval(() => {
    void runOnce();
  }, intervalMs);
  logger.info('Reservation worker started with interval schedule', {
    intervalMs,
    batchSize,
    maxRetries,
    retryBaseMs,
    lockKey,
  });

  return () => clearInterval(timer);
}

