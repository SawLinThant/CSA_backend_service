"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateBoxVersionUseCase = void 0;
class AdminUpdateBoxVersionUseCase {
    constructor(boxVersionRepository) {
        this.boxVersionRepository = boxVersionRepository;
    }
    async execute(id, input) {
        const version = await this.boxVersionRepository.findById(id);
        if (!version)
            throw new Error('Box version not found');
        return this.boxVersionRepository.update(id, {
            ...(input.versionName !== undefined && { versionName: input.versionName }),
            ...(input.startDate !== undefined && { startDate: input.startDate }),
            ...(input.endDate !== undefined && { endDate: input.endDate }),
        });
    }
}
exports.AdminUpdateBoxVersionUseCase = AdminUpdateBoxVersionUseCase;
//# sourceMappingURL=AdminUpdateBoxVersionUseCase.js.map