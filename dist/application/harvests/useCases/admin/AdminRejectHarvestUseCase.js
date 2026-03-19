"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRejectHarvestUseCase = void 0;
class AdminRejectHarvestUseCase {
    constructor(harvestRepository) {
        this.harvestRepository = harvestRepository;
    }
    async execute(harvestId, adminUserId) {
        const harvest = await this.harvestRepository.findById(harvestId);
        if (!harvest)
            throw new Error('Harvest not found');
        if (harvest.status !== 'pending')
            throw new Error('Only pending harvests can be rejected');
        return this.harvestRepository.setApproval(harvestId, 'rejected', adminUserId);
    }
}
exports.AdminRejectHarvestUseCase = AdminRejectHarvestUseCase;
//# sourceMappingURL=AdminRejectHarvestUseCase.js.map