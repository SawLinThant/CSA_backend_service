export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  boxId: string | null;
  status: SubscriptionStatus;
  startDate: Date;
  nextDeliveryDate: Date;
  nextOrderDate: Date | null;
  lastOrderDate: Date | null;
  pauseReason: string | null;
  pauseUntil: Date | null;
  createdAt: Date;
}
