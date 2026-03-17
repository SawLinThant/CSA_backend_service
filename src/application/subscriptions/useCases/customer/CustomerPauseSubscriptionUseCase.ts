import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { PauseSubscriptionInput } from '../../dtos/subscriptionDtos';

export class CustomerPauseSubscriptionUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, subscriptionId: string, input: PauseSubscriptionInput) {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new Error('Customer profile not found');

    const subscription = await this.subscriptionRepository.findByIdAndCustomerId(subscriptionId, customer.id);
    if (!subscription) throw new Error('Subscription not found');
    if (subscription.status !== 'active') throw new Error('Only active subscriptions can be paused');

    return this.subscriptionRepository.update(subscriptionId, {
      status: 'paused',
      ...(input.pauseUntil !== undefined && { pauseUntil: input.pauseUntil }),
    });
  }
}
