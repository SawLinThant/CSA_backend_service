import type { SubscriptionPlan } from '../../../domain/subscriptions/SubscriptionPlan';
import type { SubscriptionPlanRepository, SubscriptionPlanCreateData, SubscriptionPlanUpdateData, SubscriptionPlanListFilters } from '../../../domain/subscriptions/SubscriptionPlanRepository';
export declare class PrismaSubscriptionPlanRepository implements SubscriptionPlanRepository {
    findById(id: string): Promise<SubscriptionPlan | null>;
    list(skip: number, take: number, filters?: SubscriptionPlanListFilters): Promise<{
        items: SubscriptionPlan[];
        total: number;
    }>;
    create(data: SubscriptionPlanCreateData): Promise<SubscriptionPlan>;
    update(id: string, data: SubscriptionPlanUpdateData): Promise<SubscriptionPlan>;
    delete(id: string): Promise<void>;
    countSubscriptionsByPlanId(planId: string): Promise<number>;
}
//# sourceMappingURL=PrismaSubscriptionPlanRepository.d.ts.map