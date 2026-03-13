import type { Subscription } from './Subscription';

export interface SubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  listActiveByCustomer(customerId: string): Promise<Subscription[]>;
  create(subscription: Omit<Subscription, 'id' | 'createdAt'>): Promise<Subscription>;
}

