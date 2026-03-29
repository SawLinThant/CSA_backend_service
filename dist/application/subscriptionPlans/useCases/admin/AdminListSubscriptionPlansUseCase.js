"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListSubscriptionPlansUseCase = void 0;
class AdminListSubscriptionPlansUseCase {
    constructor(subscriptionPlanRepository, boxRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.boxRepository = boxRepository;
    }
    async execute(query) {
        if (query.boxId) {
            const box = await this.boxRepository.findById(query.boxId);
            if (!box)
                throw new Error('Box not found');
        }
        const skip = (query.page - 1) * query.limit;
        const filters = query.boxId !== undefined ||
            query.active !== undefined ||
            query.deliveryFrequency !== undefined ||
            query.minPrice !== undefined ||
            query.maxPrice !== undefined ||
            query.sortBy !== undefined
            ? {
                ...(query.boxId && { boxId: query.boxId }),
                ...(query.active !== undefined && { active: query.active }),
                ...(query.deliveryFrequency !== undefined && { deliveryFrequency: query.deliveryFrequency }),
                ...(query.minPrice !== undefined && { minPrice: query.minPrice }),
                ...(query.maxPrice !== undefined && { maxPrice: query.maxPrice }),
                ...(query.sortBy !== undefined && { sortBy: query.sortBy }),
            }
            : undefined;
        const { items, total } = await this.subscriptionPlanRepository.list(skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.AdminListSubscriptionPlansUseCase = AdminListSubscriptionPlansUseCase;
//# sourceMappingURL=AdminListSubscriptionPlansUseCase.js.map