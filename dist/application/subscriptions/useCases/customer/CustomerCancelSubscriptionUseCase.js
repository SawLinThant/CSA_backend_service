"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCancelSubscriptionUseCase = void 0;
class CustomerCancelSubscriptionUseCase {
    constructor(customerRepository, subscriptionRepository) {
        this.customerRepository = customerRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(userId, subscriptionId) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const subscription = await this.subscriptionRepository.findByIdAndCustomerId(subscriptionId, customer.id);
        if (!subscription)
            throw new Error('Subscription not found');
        if (subscription.status === 'cancelled')
            throw new Error('Subscription is already cancelled');
        return this.subscriptionRepository.update(subscriptionId, { status: 'cancelled' });
    }
}
exports.CustomerCancelSubscriptionUseCase = CustomerCancelSubscriptionUseCase;
//# sourceMappingURL=CustomerCancelSubscriptionUseCase.js.map