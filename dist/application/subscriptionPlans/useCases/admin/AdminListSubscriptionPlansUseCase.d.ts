import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListSubscriptionPlansQuery } from '../../dtos/subscriptionPlanDtos';
export declare class AdminListSubscriptionPlansUseCase {
    private readonly subscriptionPlanRepository;
    private readonly boxRepository;
    constructor(subscriptionPlanRepository: SubscriptionPlanRepository, boxRepository: BoxRepository);
    execute(query: ListSubscriptionPlansQuery): Promise<{
        items: import("../../../../domain/subscriptions/SubscriptionPlan").SubscriptionPlan[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListSubscriptionPlansUseCase.d.ts.map