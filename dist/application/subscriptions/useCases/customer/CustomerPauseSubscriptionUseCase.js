"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPauseSubscriptionUseCase = void 0;
class CustomerPauseSubscriptionUseCase {
    constructor(customerRepository, subscriptionRepository) {
        this.customerRepository = customerRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(userId, subscriptionId, input) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const subscription = await this.subscriptionRepository.findByIdAndCustomerId(subscriptionId, customer.id);
        if (!subscription)
            throw new Error('Subscription not found');
        if (subscription.status !== 'active')
            throw new Error('Only active subscriptions can be paused');
        return this.subscriptionRepository.update(subscriptionId, {
            status: 'paused',
            ...(input.pauseUntil !== undefined && { pauseUntil: input.pauseUntil }),
        });
    }
}
exports.CustomerPauseSubscriptionUseCase = CustomerPauseSubscriptionUseCase;
//# sourceMappingURL=CustomerPauseSubscriptionUseCase.js.map