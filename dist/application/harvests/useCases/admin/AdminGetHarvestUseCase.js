"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetHarvestUseCase = void 0;
class AdminGetHarvestUseCase {
    constructor(harvestRepository) {
        this.harvestRepository = harvestRepository;
    }
    async execute(id) {
        const harvest = await this.harvestRepository.findById(id);
        if (!harvest)
            throw new Error('Harvest not found');
        return harvest;
    }
}
exports.AdminGetHarvestUseCase = AdminGetHarvestUseCase;
//# sourceMappingURL=AdminGetHarvestUseCase.js.map