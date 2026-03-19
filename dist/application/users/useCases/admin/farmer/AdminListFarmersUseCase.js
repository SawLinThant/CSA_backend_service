"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListFarmersUseCase = void 0;
function toPublicUser(user) {
    return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status };
}
class AdminListFarmersUseCase {
    constructor(farmerRepository) {
        this.farmerRepository = farmerRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const filters = query.name ?? query.phone
            ? {
                ...(query.name && { name: query.name }),
                ...(query.phone && { phone: query.phone }),
            }
            : undefined;
        const { items, total } = await this.farmerRepository.listWithUser(skip, query.limit, filters);
        return {
            items: items.map((f) => ({
                id: f.id,
                userId: f.userId,
                farmName: f.farmName,
                farmLocation: f.farmLocation,
                farmDescription: f.farmDescription,
                approved: f.approved,
                createdAt: f.createdAt,
                user: toPublicUser(f.user),
            })),
            total,
            page: query.page,
            limit: query.limit,
        };
    }
}
exports.AdminListFarmersUseCase = AdminListFarmersUseCase;
//# sourceMappingURL=AdminListFarmersUseCase.js.map