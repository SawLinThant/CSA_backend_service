"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("../infrastructure/http/server"));
const logger_1 = require("../core/logging/logger");
const ReservationOrderWorker_1 = require("../application/orders/workers/ReservationOrderWorker");
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer(server_1.default);
server.listen(PORT, () => {
    logger_1.logger.info(`HTTP server listening on port ${PORT}`);
});
const workerEnabled = process.env.RESERVATION_WORKER_ENABLED !== 'false';
if (workerEnabled) {
    const intervalMs = Number(process.env.RESERVATION_WORKER_INTERVAL_MS ?? 60000);
    const batchSize = Number(process.env.RESERVATION_WORKER_BATCH_SIZE ?? 100);
    const maxRetries = Number(process.env.RESERVATION_WORKER_MAX_RETRIES ?? 3);
    const retryBaseMs = Number(process.env.RESERVATION_WORKER_RETRY_BASE_MS ?? 1000);
    const lockKey = Number(process.env.RESERVATION_WORKER_LOCK_KEY ?? 900017);
    const cronExpression = process.env.RESERVATION_WORKER_CRON?.trim();
    const cronTimezone = process.env.RESERVATION_WORKER_CRON_TIMEZONE?.trim();
    (0, ReservationOrderWorker_1.startReservationOrderWorker)({
        intervalMs: Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 60000,
        batchSize: Number.isFinite(batchSize) && batchSize > 0 ? batchSize : 100,
        maxRetries: Number.isFinite(maxRetries) && maxRetries >= 0 ? maxRetries : 3,
        retryBaseMs: Number.isFinite(retryBaseMs) && retryBaseMs > 0 ? retryBaseMs : 1000,
        distributedLockKey: Number.isFinite(lockKey) && lockKey > 0 ? lockKey : 900017,
        ...(cronExpression ? { cronExpression } : {}),
        ...(cronTimezone ? { timezone: cronTimezone } : {}),
    });
    logger_1.logger.info('Reservation order worker started');
}
//# sourceMappingURL=index.js.map