import type { Subscription } from '../../../../domain/subscriptions/Subscription';
import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
export declare class CustomerGetSubscriptionUseCase {
    private readonly customerRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, subscriptionId: string): Promise<Subscription>;
}
//# sourceMappingURL=CustomerGetSubscriptionUseCase.d.ts.map