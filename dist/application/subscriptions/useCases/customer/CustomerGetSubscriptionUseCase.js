"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGetSubscriptionUseCase = void 0;
class CustomerGetSubscriptionUseCase {
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
        return subscription;
    }
}
exports.CustomerGetSubscriptionUseCase = CustomerGetSubscriptionUseCase;
//# sourceMappingURL=CustomerGetSubscriptionUseCase.js.map