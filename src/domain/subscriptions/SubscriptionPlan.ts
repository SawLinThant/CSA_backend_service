export type DeliveryFrequency = 'weekly' | 'monthly';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryFrequency: DeliveryFrequency;
  active: boolean;
}

