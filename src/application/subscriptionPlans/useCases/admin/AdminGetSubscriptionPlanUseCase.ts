import type { SubscriptionPlan } from '../../../../domain/subscriptions/SubscriptionPlan';
import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';

export class AdminGetSubscriptionPlanUseCase {
  constructor(private readonly subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute(id: string): Promise<SubscriptionPlan> {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) throw new Error('Subscription plan not found');
    return plan;
  }
}
