"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerGetHarvestUseCase = void 0;
class FarmerGetHarvestUseCase {
    constructor(farmerRepository, harvestRepository) {
        this.farmerRepository = farmerRepository;
        this.harvestRepository = harvestRepository;
    }
    async execute(userId, harvestId) {
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        const harvest = await this.harvestRepository.findByIdAndFarmerId(harvestId, farmer.id);
        if (!harvest)
            throw new Error('Harvest not found');
        return harvest;
    }
}
exports.FarmerGetHarvestUseCase = FarmerGetHarvestUseCase;
//# sourceMappingURL=FarmerGetHarvestUseCase.js.map