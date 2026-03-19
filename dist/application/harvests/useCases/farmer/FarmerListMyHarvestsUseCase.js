"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerListMyHarvestsUseCase = void 0;
class FarmerListMyHarvestsUseCase {
    constructor(farmerRepository, harvestRepository) {
        this.farmerRepository = farmerRepository;
        this.harvestRepository = harvestRepository;
    }
    async execute(userId, query) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const skip = (query.page - 1) * query.limit;
        const hasFilters = query.productId ||
            query.status !== undefined ||
            query.harvestDateFrom !== undefined ||
            query.harvestDateTo !== undefined;
        const filters = hasFilters
            ? {
                ...(query.productId && { productId: query.productId }),
                ...(query.status !== undefined && { status: query.status }),
                ...(query.harvestDateFrom !== undefined && { harvestDateFrom: query.harvestDateFrom }),
                ...(query.harvestDateTo !== undefined && { harvestDateTo: query.harvestDateTo }),
            }
            : undefined;
        const { items, total } = await this.harvestRepository.listByFarmerId(farmer.id, skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.FarmerListMyHarvestsUseCase = FarmerListMyHarvestsUseCase;
//# sourceMappingURL=FarmerListMyHarvestsUseCase.js.map