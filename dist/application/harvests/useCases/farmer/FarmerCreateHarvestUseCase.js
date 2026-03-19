"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerCreateHarvestUseCase = void 0;
class FarmerCreateHarvestUseCase {
    constructor(farmerRepository, productRepository, harvestRepository) {
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
        this.harvestRepository = harvestRepository;
    }
    async execute(userId, input) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const product = await this.productRepository.findByIdAndFarmerId(input.productId, farmer.id);
        if (!product)
            throw new Error('Product not found');
        return this.harvestRepository.create({
            farmerId: farmer.id,
            productId: input.productId,
            quantityAvailable: input.quantityAvailable,
            unitPrice: input.unitPrice,
            harvestDate: input.harvestDate,
            availableUntil: input.availableUntil,
        });
    }
}
exports.FarmerCreateHarvestUseCase = FarmerCreateHarvestUseCase;
//# sourceMappingURL=FarmerCreateHarvestUseCase.js.map