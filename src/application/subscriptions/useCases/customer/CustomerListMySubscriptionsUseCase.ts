import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { ListMySubscriptionsQuery } from '../../dtos/subscriptionDtos';

export class CustomerListMySubscriptionsUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, query: ListMySubscriptionsQuery) {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new Error('Customer profile not found');

    const skip = (query.page - 1) * query.limit;
    const filters = query.status ? { status: query.status } : undefined;
    const { items, total } = await this.subscriptionRepository.listByCustomerId(
      customer.id,
      skip,
      query.limit,
      filters,
    );
    return { items, total, page: query.page, limit: query.limit };
  }
}
