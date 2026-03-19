"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerListMyProductsUseCase = void 0;
class FarmerListMyProductsUseCase {
    constructor(farmerRepository, productRepository) {
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
    }
    async execute(userId, query) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const skip = (query.page - 1) * query.limit;
        const filters = query.name ?? query.categoryId ?? query.isActive !== undefined
            ? {
                ...(query.name && { name: query.name }),
                ...(query.categoryId && { categoryId: query.categoryId }),
                ...(query.isActive !== undefined && { isActive: query.isActive }),
            }
            : undefined;
        const { items, total } = await this.productRepository.listByFarmerId(farmer.id, skip, query.limit, filters);
        return {
            items,
            total,
            page: query.page,
            limit: query.limit,
        };
    }
}
exports.FarmerListMyProductsUseCase = FarmerListMyProductsUseCase;
//# sourceMappingURL=FarmerListMyProductsUseCase.js.map