export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  nextDeliveryDate: Date;
  pauseUntil: Date | null;
  createdAt: Date;
}
