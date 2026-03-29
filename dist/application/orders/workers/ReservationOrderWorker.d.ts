export declare function runReservationOrderCycle(limit?: number, attempt?: number): Promise<void>;
export declare function startReservationOrderWorker(config?: {
    intervalMs?: number;
    cronExpression?: string;
    timezone?: string;
    batchSize?: number;
    maxRetries?: number;
    retryBaseMs?: number;
    distributedLockKey?: number;
}): () => void | Promise<void>;
//# sourceMappingURL=ReservationOrderWorker.d.ts.map