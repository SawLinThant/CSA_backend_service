import type { SubscriptionPlan } from '../../../../domain/subscriptions/SubscriptionPlan';
import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
export declare class AdminGetSubscriptionPlanUseCase {
    private readonly subscriptionPlanRepository;
    constructor(subscriptionPlanRepository: SubscriptionPlanRepository);
    execute(id: string): Promise<SubscriptionPlan>;
}
//# sourceMappingURL=AdminGetSubscriptionPlanUseCase.d.ts.map