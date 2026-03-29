import type { Subscription } from './Subscription';
export type SubscriptionCreateData = Omit<Subscription, 'id' | 'createdAt'>;
export type SubscriptionUpdateData = Partial<Pick<Subscription, 'status' | 'nextDeliveryDate' | 'nextOrderDate' | 'lastOrderDate' | 'pauseReason' | 'pauseUntil'>>;
export interface SubscriptionListByCustomerFilters {
    status?: Subscription['status'];
}
export interface SubscriptionRepository {
    create(data: SubscriptionCreateData): Promise<Subscription>;
    findById(id: string): Promise<Subscription | null>;
    findByIdAndCustomerId(id: string, customerId: string): Promise<Subscription | null>;
    listByCustomerId(customerId: string, skip: number, take: number, filters?: SubscriptionListByCustomerFilters): Promise<{
        items: Subscription[];
        total: number;
    }>;
    update(id: string, data: SubscriptionUpdateData): Promise<Subscription>;
}
//# sourceMappingURL=SubscriptionRepository.d.ts.map