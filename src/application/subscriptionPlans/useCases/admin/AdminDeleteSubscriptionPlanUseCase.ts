import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';

export class AdminDeleteSubscriptionPlanUseCase {
  constructor(private readonly subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute(id: string) {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) throw new Error('Subscription plan not found');
    const count = await this.subscriptionPlanRepository.countSubscriptionsByPlanId(id);
    if (count > 0) throw new Error('Cannot delete plan that has active subscriptions. Cancel or remove subscriptions first.');
    await this.subscriptionPlanRepository.delete(id);
  }
}
