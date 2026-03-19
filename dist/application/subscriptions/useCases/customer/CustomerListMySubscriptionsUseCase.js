"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerListMySubscriptionsUseCase = void 0;
class CustomerListMySubscriptionsUseCase {
    constructor(customerRepository, subscriptionRepository) {
        this.customerRepository = customerRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(userId, query) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const skip = (query.page - 1) * query.limit;
        const filters = query.status ? { status: query.status } : undefined;
        const { items, total } = await this.subscriptionRepository.listByCustomerId(customer.id, skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.CustomerListMySubscriptionsUseCase = CustomerListMySubscriptionsUseCase;
//# sourceMappingURL=CustomerListMySubscriptionsUseCase.js.map