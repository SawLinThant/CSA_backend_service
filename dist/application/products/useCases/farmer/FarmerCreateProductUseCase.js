"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerCreateProductUseCase = void 0;
class FarmerCreateProductUseCase {
    constructor(farmerRepository, categoryRepository, productRepository) {
        this.farmerRepository = farmerRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async execute(userId, input) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const category = await this.categoryRepository.findById(input.categoryId);
        if (!category)
            throw new Error('Category not found');
        return this.productRepository.create({
            farmerId: farmer.id,
            categoryId: input.categoryId,
            name: input.name,
            description: input.description ?? null,
            unit: input.unit,
            basePrice: input.basePrice,
            isActive: true,
        }, input.images?.length ? input.images : undefined);
    }
}
exports.FarmerCreateProductUseCase = FarmerCreateProductUseCase;
//# sourceMappingURL=FarmerCreateProductUseCase.js.map