import 'dotenv/config';
import http from 'http';
import app from '../infrastructure/http/server';
import { logger } from '../core/logging/logger';
import { startReservationOrderWorker } from '../application/orders/workers/ReservationOrderWorker';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`HTTP server listening on port ${PORT}`);
});

const workerEnabled = process.env.RESERVATION_WORKER_ENABLED !== 'false';
if (workerEnabled) {
  const intervalMs = Number(process.env.RESERVATION_WORKER_INTERVAL_MS ?? 60_000);
  const batchSize = Number(process.env.RESERVATION_WORKER_BATCH_SIZE ?? 100);
  const maxRetries = Number(process.env.RESERVATION_WORKER_MAX_RETRIES ?? 3);
  const retryBaseMs = Number(process.env.RESERVATION_WORKER_RETRY_BASE_MS ?? 1000);
  const lockKey = Number(process.env.RESERVATION_WORKER_LOCK_KEY ?? 900017);
  const cronExpression = process.env.RESERVATION_WORKER_CRON?.trim();
  const cronTimezone = process.env.RESERVATION_WORKER_CRON_TIMEZONE?.trim();
  startReservationOrderWorker({
    intervalMs: Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 60_000,
    batchSize: Number.isFinite(batchSize) && batchSize > 0 ? batchSize : 100,
    maxRetries: Number.isFinite(maxRetries) && maxRetries >= 0 ? maxRetries : 3,
    retryBaseMs: Number.isFinite(retryBaseMs) && retryBaseMs > 0 ? retryBaseMs : 1000,
    distributedLockKey: Number.isFinite(lockKey) && lockKey > 0 ? lockKey : 900017,
    ...(cronExpression ? { cronExpression } : {}),
    ...(cronTimezone ? { timezone: cronTimezone } : {}),
  });
  logger.info('Reservation order worker started');
}

