"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteCustomerUseCase = void 0;
class AdminDeleteCustomerUseCase {
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }
    async execute(customerId) {
        const customer = await this.customerRepository.getByIdWithUser(customerId);
        if (!customer)
            throw new Error('Customer not found');
        await this.userRepository.delete(customer.userId);
    }
}
exports.AdminDeleteCustomerUseCase = AdminDeleteCustomerUseCase;
//# sourceMappingURL=AdminDeleteCustomerUseCase.js.map