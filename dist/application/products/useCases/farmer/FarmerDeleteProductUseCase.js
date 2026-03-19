"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerDeleteProductUseCase = void 0;
class FarmerDeleteProductUseCase {
    constructor(farmerRepository, productRepository) {
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
    }
    async execute(userId, productId) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const product = await this.productRepository.findByIdAndFarmerId(productId, farmer.id);
        if (!product)
            throw new Error('Product not found');
        await this.productRepository.delete(productId);
    }
}
exports.FarmerDeleteProductUseCase = FarmerDeleteProductUseCase;
//# sourceMappingURL=FarmerDeleteProductUseCase.js.map