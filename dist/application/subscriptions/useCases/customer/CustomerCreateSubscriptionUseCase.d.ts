import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { CreateSubscriptionInput } from '../../dtos/subscriptionDtos';
export declare class CustomerCreateSubscriptionUseCase {
    private readonly customerRepository;
    private readonly subscriptionPlanRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionPlanRepository: SubscriptionPlanRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, input: CreateSubscriptionInput): Promise<import("../../../../domain/subscriptions/Subscription").Subscription>;
}
//# sourceMappingURL=CustomerCreateSubscriptionUseCase.d.ts.map