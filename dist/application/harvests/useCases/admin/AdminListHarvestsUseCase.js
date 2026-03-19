"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListHarvestsUseCase = void 0;
class AdminListHarvestsUseCase {
    constructor(harvestRepository) {
        this.harvestRepository = harvestRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const hasFilters = query.farmerId ||
            query.productId ||
            query.status !== undefined ||
            query.harvestDateFrom !== undefined ||
            query.harvestDateTo !== undefined;
        const filters = hasFilters
            ? {
                ...(query.farmerId && { farmerId: query.farmerId }),
                ...(query.productId && { productId: query.productId }),
                ...(query.status !== undefined && { status: query.status }),
                ...(query.harvestDateFrom !== undefined && { harvestDateFrom: query.harvestDateFrom }),
                ...(query.harvestDateTo !== undefined && { harvestDateTo: query.harvestDateTo }),
            }
            : undefined;
        const { items, total } = await this.harvestRepository.list(skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.AdminListHarvestsUseCase = AdminListHarvestsUseCase;
//# sourceMappingURL=AdminListHarvestsUseCase.js.map