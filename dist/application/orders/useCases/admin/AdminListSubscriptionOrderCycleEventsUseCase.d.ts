import type { AdminListSubscriptionOrderCycleEventsQuery } from '../../dtos/orderOpsDtos';
export declare class AdminListSubscriptionOrderCycleEventsUseCase {
    execute(query: AdminListSubscriptionOrderCycleEventsQuery): Promise<{
        items: {
            id: string;
            subscriptionId: string | null;
            cycleDate: Date | null;
            referenceDate: Date;
            outcome: import("../../../../generated/prisma/enums").SubscriptionOrderCycleOutcome;
            reason: string | null;
            attempt: number;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=AdminListSubscriptionOrderCycleEventsUseCase.d.ts.map