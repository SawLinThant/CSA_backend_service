"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteBoxUseCase = void 0;
class AdminDeleteBoxUseCase {
    constructor(boxRepository, boxVersionRepository) {
        this.boxRepository = boxRepository;
        this.boxVersionRepository = boxVersionRepository;
    }
    async execute(id) {
        const box = await this.boxRepository.findById(id);
        if (!box)
            throw new Error('Box not found');
        const { items } = await this.boxVersionRepository.list(0, 1, { boxId: id });
        if (items.length > 0)
            throw new Error('Cannot delete box that has versions. Delete all box versions first.');
        await this.boxRepository.delete(id);
    }
}
exports.AdminDeleteBoxUseCase = AdminDeleteBoxUseCase;
//# sourceMappingURL=AdminDeleteBoxUseCase.js.map