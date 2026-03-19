"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerUpdateHarvestUseCase = void 0;
class FarmerUpdateHarvestUseCase {
    constructor(farmerRepository, harvestRepository) {
        this.farmerRepository = farmerRepository;
        this.harvestRepository = harvestRepository;
    }
    async execute(userId, harvestId, input) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const harvest = await this.harvestRepository.findByIdAndFarmerId(harvestId, farmer.id);
        if (!harvest)
            throw new Error('Harvest not found');
        if (harvest.status !== 'pending')
            throw new Error('Only pending harvests can be updated');
        return this.harvestRepository.update(harvestId, {
            ...(input.quantityAvailable !== undefined && { quantityAvailable: input.quantityAvailable }),
            ...(input.unitPrice !== undefined && { unitPrice: input.unitPrice }),
            ...(input.harvestDate !== undefined && { harvestDate: input.harvestDate }),
            ...(input.availableUntil !== undefined && { availableUntil: input.availableUntil }),
        });
    }
}
exports.FarmerUpdateHarvestUseCase = FarmerUpdateHarvestUseCase;
//# sourceMappingURL=FarmerUpdateHarvestUseCase.js.map