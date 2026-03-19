"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCreateSubscriptionUseCase = void 0;
function addWeeks(date, weeks) {
    const result = new Date(date);
    result.setDate(result.getDate() + weeks * 7);
    return result;
}
function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}
class CustomerCreateSubscriptionUseCase {
    constructor(customerRepository, subscriptionPlanRepository, subscriptionRepository) {
        this.customerRepository = customerRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(userId, input) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const plan = await this.subscriptionPlanRepository.findById(input.planId);
        if (!plan)
            throw new Error('Subscription plan not found');
        if (!plan.active)
            throw new Error('Subscription plan is not active');
        const startDate = input.startDate ?? new Date();
        let nextDeliveryDate;
        if (plan.deliveryFrequency === 'weekly') {
            nextDeliveryDate = addWeeks(startDate, 1);
        }
        else {
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
exports.CustomerCreateSubscriptionUseCase = CustomerCreateSubscriptionUseCase;
//# sourceMappingURL=CustomerCreateSubscriptionUseCase.js.map