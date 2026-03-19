import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateSubscriptionPlanInput } from '../../dtos/subscriptionPlanDtos';
export declare class AdminCreateSubscriptionPlanUseCase {
    private readonly subscriptionPlanRepository;
    private readonly boxRepository;
    constructor(subscriptionPlanRepository: SubscriptionPlanRepository, boxRepository: BoxRepository);
    execute(input: CreateSubscriptionPlanInput): Promise<import("../../../../domain/subscriptions/SubscriptionPlan").SubscriptionPlan>;
}
//# sourceMappingURL=AdminCreateSubscriptionPlanUseCase.d.ts.map