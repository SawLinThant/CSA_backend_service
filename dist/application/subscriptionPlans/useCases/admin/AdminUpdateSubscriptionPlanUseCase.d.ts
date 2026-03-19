import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { UpdateSubscriptionPlanInput } from '../../dtos/subscriptionPlanDtos';
export declare class AdminUpdateSubscriptionPlanUseCase {
    private readonly subscriptionPlanRepository;
    constructor(subscriptionPlanRepository: SubscriptionPlanRepository);
    execute(id: string, input: UpdateSubscriptionPlanInput): Promise<import("../../../../domain/subscriptions/SubscriptionPlan").SubscriptionPlan>;
}
//# sourceMappingURL=AdminUpdateSubscriptionPlanUseCase.d.ts.map