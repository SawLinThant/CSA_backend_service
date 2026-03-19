"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetCustomerUseCase = void 0;
class AdminGetCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(customerId) {
        const customerWithUser = await this.customerRepository.getByIdWithUser(customerId);
        if (!customerWithUser)
            throw new Error('Customer not found');
        return {
            id: customerWithUser.id,
            userId: customerWithUser.userId,
            createdAt: customerWithUser.createdAt,
            user: {
                id: customerWithUser.user.id,
                name: customerWithUser.user.name,
                email: customerWithUser.user.email,
                phone: customerWithUser.user.phone,
                role: customerWithUser.user.role,
                status: customerWithUser.user.status,
            },
        };
    }
}
exports.AdminGetCustomerUseCase = AdminGetCustomerUseCase;
//# sourceMappingURL=AdminGetCustomerUseCase.js.map