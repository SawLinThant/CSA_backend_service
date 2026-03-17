import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { UpdateSubscriptionPlanInput } from '../../dtos/subscriptionPlanDtos';

export class AdminUpdateSubscriptionPlanUseCase {
  constructor(private readonly subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute(id: string, input: UpdateSubscriptionPlanInput) {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) throw new Error('Subscription plan not found');
    return this.subscriptionPlanRepository.update(id, {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.deliveryFrequency !== undefined && { deliveryFrequency: input.deliveryFrequency }),
      ...(input.deliveriesPerCycle !== undefined && { deliveriesPerCycle: input.deliveriesPerCycle }),
      ...(input.active !== undefined && { active: input.active }),
    });
  }
}
