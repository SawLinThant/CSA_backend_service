import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
export declare class AdminDeleteSubscriptionPlanUseCase {
    private readonly subscriptionPlanRepository;
    constructor(subscriptionPlanRepository: SubscriptionPlanRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteSubscriptionPlanUseCase.d.ts.map