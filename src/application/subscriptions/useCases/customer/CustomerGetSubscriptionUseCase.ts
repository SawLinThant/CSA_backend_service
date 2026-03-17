import type { Subscription } from '../../../../domain/subscriptions/Subscription';
import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';

export class CustomerGetSubscriptionUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, subscriptionId: string): Promise<Subscription> {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new Error('Customer profile not found');

    const subscription = await this.subscriptionRepository.findByIdAndCustomerId(subscriptionId, customer.id);
    if (!subscription) throw new Error('Subscription not found');
    return subscription;
  }
}
