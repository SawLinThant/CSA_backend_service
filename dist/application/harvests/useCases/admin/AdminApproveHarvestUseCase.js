"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminApproveHarvestUseCase = void 0;
class AdminApproveHarvestUseCase {
    constructor(harvestRepository) {
        this.harvestRepository = harvestRepository;
    }
    async execute(harvestId, adminUserId) {
        const harvest = await this.harvestRepository.findById(harvestId);
        if (!harvest)
            throw new Error('Harvest not found');
        if (harvest.status !== 'pending')
            throw new Error('Only pending harvests can be approved');
        return this.harvestRepository.setApproval(harvestId, 'approved', adminUserId);
    }
}
exports.AdminApproveHarvestUseCase = AdminApproveHarvestUseCase;
//# sourceMappingURL=AdminApproveHarvestUseCase.js.map