import type { SubscriptionPlan } from './SubscriptionPlan';

export type SubscriptionPlanCreateData = Omit<SubscriptionPlan, 'id' | 'createdAt'>;
export type SubscriptionPlanUpdateData = Partial<
  Pick<SubscriptionPlan, 'name' | 'price' | 'deliveryFrequency' | 'deliveriesPerCycle' | 'active'>
>;

export interface SubscriptionPlanListFilters {
  boxId?: string;
  active?: boolean;
}

export interface SubscriptionPlanRepository {
  findById(id: string): Promise<SubscriptionPlan | null>;
  list(
    skip: number,
    take: number,
    filters?: SubscriptionPlanListFilters,
  ): Promise<{ items: SubscriptionPlan[]; total: number }>;
  create(data: SubscriptionPlanCreateData): Promise<SubscriptionPlan>;
  update(id: string, data: SubscriptionPlanUpdateData): Promise<SubscriptionPlan>;
  delete(id: string): Promise<void>;
  countSubscriptionsByPlanId(planId: string): Promise<number>;
}
