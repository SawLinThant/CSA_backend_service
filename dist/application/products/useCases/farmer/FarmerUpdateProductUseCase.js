"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerUpdateProductUseCase = void 0;
class FarmerUpdateProductUseCase {
    constructor(farmerRepository, categoryRepository, productRepository) {
        this.farmerRepository = farmerRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async execute(userId, productId, input) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const product = await this.productRepository.findByIdAndFarmerId(productId, farmer.id);
        if (!product)
            throw new Error('Product not found');
        if (input.categoryId !== undefined) {
            const category = await this.categoryRepository.findById(input.categoryId);
            if (!category)
                throw new Error('Category not found');
        }
        return this.productRepository.update(productId, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.description !== undefined && { description: input.description }),
            ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
            ...(input.unit !== undefined && { unit: input.unit }),
            ...(input.basePrice !== undefined && { basePrice: input.basePrice }),
            ...(input.isActive !== undefined && { isActive: input.isActive }),
        }, input.images);
    }
}
exports.FarmerUpdateProductUseCase = FarmerUpdateProductUseCase;
//# sourceMappingURL=FarmerUpdateProductUseCase.js.map