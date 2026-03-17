import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';

export class CustomerCancelSubscriptionUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, subscriptionId: string) {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new Error('Customer profile not found');

    const subscription = await this.subscriptionRepository.findByIdAndCustomerId(subscriptionId, customer.id);
    if (!subscription) throw new Error('Subscription not found');
    if (subscription.status === 'cancelled') throw new Error('Subscription is already cancelled');

    return this.subscriptionRepository.update(subscriptionId, { status: 'cancelled' });
  }
}
