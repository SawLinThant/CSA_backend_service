import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { SubscriptionRepository } from '../../../../domain/subscriptions/SubscriptionRepository';
import type { CreateSubscriptionInput } from '../../dtos/subscriptionDtos';

function addWeeks(date: Date, weeks: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export class CustomerCreateSubscriptionUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, input: CreateSubscriptionInput) {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new Error('Customer profile not found');

    const plan = await this.subscriptionPlanRepository.findById(input.planId);
    if (!plan) throw new Error('Subscription plan not found');
    if (!plan.active) throw new Error('Subscription plan is not active');

    const startDate = input.startDate ?? new Date();
    let nextDeliveryDate: Date;
    if (plan.deliveryFrequency === 'weekly') {
      nextDeliveryDate = addWeeks(startDate, 1);
    } else {
      nextDeliveryDate = addMonths(startDate, 1);
    }

    return this.subscriptionRepository.create({
      customerId: customer.id,
      planId: input.planId,
      status: 'active',
      startDate,
      nextDeliveryDate,
      pauseUntil: null,
    });
  }
}
