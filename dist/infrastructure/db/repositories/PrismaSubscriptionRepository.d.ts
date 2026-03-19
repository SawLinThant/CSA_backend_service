import type { Subscription } from '../../../domain/subscriptions/Subscription';
import type { SubscriptionRepository, SubscriptionCreateData, SubscriptionUpdateData, SubscriptionListByCustomerFilters } from '../../../domain/subscriptions/SubscriptionRepository';
export declare class PrismaSubscriptionRepository implements SubscriptionRepository {
    create(data: SubscriptionCreateData): Promise<Subscription>;
    findById(id: string): Promise<Subscription | null>;
    findByIdAndCustomerId(id: string, customerId: string): Promise<Subscription | null>;
    listByCustomerId(customerId: string, skip: number, take: number, filters?: SubscriptionListByCustomerFilters): Promise<{
        items: Subscription[];
        total: number;
    }>;
    update(id: string, data: SubscriptionUpdateData): Promise<Subscription>;
}
//# sourceMappingURL=PrismaSubscriptionRepository.d.ts.map