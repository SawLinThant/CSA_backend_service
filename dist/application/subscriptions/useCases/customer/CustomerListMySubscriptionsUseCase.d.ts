import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { ListMySubscriptionsQuery } from '../../dtos/subscriptionDtos';
export declare class CustomerListMySubscriptionsUseCase {
    private readonly customerRepository;
    private readonly subscriptionRepository;
    constructor(customerRepository: CustomerRepository, subscriptionRepository: SubscriptionRepository);
    execute(userId: string, query: ListMySubscriptionsQuery): Promise<{
        items: import("../../../../domain/subscriptions/Subscription").Subscription[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=CustomerListMySubscriptionsUseCase.d.ts.map