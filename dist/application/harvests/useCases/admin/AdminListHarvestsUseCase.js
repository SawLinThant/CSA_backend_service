"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListHarvestsUseCase = void 0;
class AdminListHarvestsUseCase {
    constructor(harvestRepository, farmerRepository, productRepository, userRepository) {
        this.harvestRepository = harvestRepository;
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
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
        const farmerIds = Array.from(new Set(items.map((h) => h.farmerId)));
        const productIds = Array.from(new Set(items.map((h) => h.productId)));
        const farmerNameById = {};
        await Promise.all(farmerIds.map(async (farmerId) => {
            const farmer = await this.farmerRepository.findById(farmerId);
            if (!farmer)
                return;
            const user = await this.userRepository.findById(farmer.userId);
            if (!user)
                return;
            farmerNameById[farmerId] = user.name;
        }));
        const productNameById = {};
        await Promise.all(productIds.map(async (productId) => {
            const product = await this.productRepository.findById(productId);
            if (!product)
                return;
            productNameById[productId] = product.name;
        }));
        const enrichedItems = items.map((h) => ({
            ...h,
            farmerName: farmerNameById[h.farmerId] ?? null,
            productName: productNameById[h.productId] ?? null,
        }));
        return { items: enrichedItems, total, page: query.page, limit: query.limit };
    }
}
exports.AdminListHarvestsUseCase = AdminListHarvestsUseCase;
//# sourceMappingURL=AdminListHarvestsUseCase.js.map