import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { PauseSubscriptionInput } from '../../dtos/subscriptionDtos';
export declare class CustomerPauseSubscriptionUseCase {
    private readonly customerRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, subscriptionId: string, input: PauseSubscriptionInput): Promise<import("../../../../domain/subscriptions/Subscription").Subscription>;
}
//# sourceMappingURL=CustomerPauseSubscriptionUseCase.d.ts.map