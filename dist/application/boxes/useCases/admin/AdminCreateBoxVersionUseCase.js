"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateBoxVersionUseCase = void 0;
class AdminCreateBoxVersionUseCase {
    constructor(boxVersionRepository, boxRepository) {
        this.boxVersionRepository = boxVersionRepository;
        this.boxRepository = boxRepository;
    }
    async execute(input) {
        const box = await this.boxRepository.findById(input.boxId);
        if (!box)
            throw new Error('Box not found');
        return this.boxVersionRepository.create({
            boxId: input.boxId,
            versionName: input.versionName,
            startDate: input.startDate,
            endDate: input.endDate ?? null,
        });
    }
}
exports.AdminCreateBoxVersionUseCase = AdminCreateBoxVersionUseCase;
//# sourceMappingURL=AdminCreateBoxVersionUseCase.js.map