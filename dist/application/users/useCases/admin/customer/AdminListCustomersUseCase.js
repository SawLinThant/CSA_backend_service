"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListCustomersUseCase = void 0;
function toPublicUser(user) {
    return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role };
}
class AdminListCustomersUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const filters = query.name ?? query.phone ?? query.usertype
            ? {
                ...(query.name && { name: query.name }),
                ...(query.phone && { phone: query.phone }),
                ...(query.usertype && { role: query.usertype }),
            }
            : undefined;
        const { items, total } = await this.customerRepository.listWithUser(skip, query.limit, filters);
        return {
            items: items.map((c) => ({
                id: c.id,
                userId: c.userId,
                defaultAddressId: c.defaultAddressId,
                createdAt: c.createdAt,
                user: toPublicUser(c.user),
            })),
            total,
            page: query.page,
            limit: query.limit,
        };
    }
}
exports.AdminListCustomersUseCase = AdminListCustomersUseCase;
//# sourceMappingURL=AdminListCustomersUseCase.js.map