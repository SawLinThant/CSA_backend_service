"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runReservationOrderCycle = runReservationOrderCycle;
exports.startReservationOrderWorker = startReservationOrderWorker;
const logger_1 = require("../../../core/logging/logger");
const prismaClient_1 = __importDefault(require("../../../infrastructure/db/prismaClient"));
const node_cron_1 = __importDefault(require("node-cron"));
const GenerateDueSubscriptionOrdersUseCase_1 = require("../useCases/GenerateDueSubscriptionOrdersUseCase");
const generateDueSubscriptionOrdersUseCase = new GenerateDueSubscriptionOrdersUseCase_1.GenerateDueSubscriptionOrdersUseCase();
const DEFAULT_LOCK_KEY = 900017;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function withDistributedLock(lockKey, fn) {
    const lockRows = await prismaClient_1.default.$queryRaw `
    SELECT pg_try_advisory_lock(${lockKey})
  `;
    const acquired = lockRows[0]?.pg_try_advisory_lock === true;
    if (!acquired)
        return null;
    try {
        return await fn();
    }
    finally {
        await prismaClient_1.default.$queryRaw `SELECT pg_advisory_unlock(${lockKey})`;
    }
}
async function runWithRetry(args) {
    let attempt = 0;
    while (true) {
        attempt += 1;
        try {
            await runReservationOrderCycle(args.batchSize, attempt);
            return;
        }
        catch (error) {
            if (attempt > args.maxRetries)
                throw error;
            const waitMs = args.retryBaseMs * Math.pow(2, attempt - 1);
            logger_1.logger.info('Reservation worker cycle retry scheduled', {
                attempt,
                maxRetries: args.maxRetries,
                waitMs,
                err: error instanceof Error ? error.message : String(error),
            });
            await sleep(waitMs);
        }
    }
}
async function runReservationOrderCycle(limit = 100, attempt = 1) {
    const result = await generateDueSubscriptionOrdersUseCase.execute(new Date(), limit, attempt);
    logger_1.logger.info('Reservation order worker cycle completed', {
        scanned: result.scanned,
        created: result.created,
        skipped: result.skipped,
        failed: result.failed,
        attempt,
        referenceDate: result.referenceDate.toISOString(),
    });
}
function startReservationOrderWorker(config) {
    const batchSize = Number.isFinite(config?.batchSize) && (config?.batchSize ?? 0) > 0 ? config?.batchSize : 100;
    const maxRetries = Number.isFinite(config?.maxRetries) && (config?.maxRetries ?? 0) >= 0 ? config?.maxRetries : 3;
    const retryBaseMs = Number.isFinite(config?.retryBaseMs) && (config?.retryBaseMs ?? 0) > 0 ? config?.retryBaseMs : 1000;
    const lockKey = Number.isFinite(config?.distributedLockKey) && (config?.distributedLockKey ?? 0) > 0
        ? config?.distributedLockKey
        : DEFAULT_LOCK_KEY;
    let inProgress = false;
    const runOnce = async () => {
        if (inProgress) {
            logger_1.logger.info('Reservation worker trigger skipped: previous run still in progress');
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
                logger_1.logger.info('Reservation worker skipped: lock already held by another runner', { lockKey });
            }
        }
        catch (error) {
            logger_1.logger.error('Reservation worker cycle failed', {
                err: error instanceof Error ? error.message : String(error),
            });
        }
        finally {
            inProgress = false;
            logger_1.logger.info('Reservation worker trigger finished', {
                elapsedMs: Date.now() - startedAt,
                batchSize,
            });
        }
    };
    if (config?.cronExpression) {
        const task = node_cron_1.default.schedule(config.cronExpression, () => {
            void runOnce();
        }, config.timezone ? { timezone: config.timezone } : undefined);
        task.start();
        logger_1.logger.info('Reservation worker started with cron schedule', {
            cronExpression: config.cronExpression,
            timezone: config.timezone ?? null,
            batchSize,
            maxRetries,
            retryBaseMs,
            lockKey,
        });
        return () => task.stop();
    }
    const intervalMs = Number.isFinite(config?.intervalMs) && (config?.intervalMs ?? 0) > 0 ? config?.intervalMs : 60000;
    const timer = setInterval(() => {
        void runOnce();
    }, intervalMs);
    logger_1.logger.info('Reservation worker started with interval schedule', {
        intervalMs,
        batchSize,
        maxRetries,
        retryBaseMs,
        lockKey,
    });
    return () => clearInterval(timer);
}
//# sourceMappingURL=ReservationOrderWorker.js.map