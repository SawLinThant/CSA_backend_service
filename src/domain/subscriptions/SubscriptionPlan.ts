export type DeliveryFrequency = 'weekly' | 'monthly';

export interface SubscriptionPlan {
  id: string;
  boxId: string;
  name: string;
  price: number;
  deliveryFrequency: DeliveryFrequency;
  deliveriesPerCycle: number;
  active: boolean;
  createdAt: Date;
}
