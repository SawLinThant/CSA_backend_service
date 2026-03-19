import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
export declare class CustomerCancelSubscriptionUseCase {
    private readonly customerRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, subscriptionId: string): Promise<import("../../../../domain/subscriptions/Subscription").Subscription>;
}
//# sourceMappingURL=CustomerCancelSubscriptionUseCase.d.ts.map