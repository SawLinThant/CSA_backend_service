import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateSubscriptionPlanInput } from '../../dtos/subscriptionPlanDtos';

export class AdminCreateSubscriptionPlanUseCase {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(input: CreateSubscriptionPlanInput) {
    const box = await this.boxRepository.findById(input.boxId);
    if (!box) throw new Error('Box not found');
    return this.subscriptionPlanRepository.create({
      boxId: input.boxId,
      name: input.name,
      price: input.price,
      deliveryFrequency: input.deliveryFrequency,
      deliveriesPerCycle: input.deliveriesPerCycle,
      active: input.active ?? true,
    });
  }
}
