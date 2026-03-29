import type { AdminSubscriptionOrderOpsSummaryQuery } from '../../dtos/orderOpsDtos';
export declare class AdminGetSubscriptionOrderOpsSummaryUseCase {
    execute(query: AdminSubscriptionOrderOpsSummaryQuery): Promise<{
        referenceDate: Date;
        dueSubscriptions: number;
        generatedOrders: number;
        failedAttempts: {
            total: number;
            byReason: {
                reason: string;
                count: number;
            }[];
        };
        pausedCapacitySubscriptions: number;
    }>;
}
//# sourceMappingURL=AdminGetSubscriptionOrderOpsSummaryUseCase.d.ts.map