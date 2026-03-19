"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteBoxVersionUseCase = void 0;
class AdminDeleteBoxVersionUseCase {
    constructor(boxVersionRepository, boxItemRepository) {
        this.boxVersionRepository = boxVersionRepository;
        this.boxItemRepository = boxItemRepository;
    }
    async execute(id) {
        const version = await this.boxVersionRepository.findById(id);
        if (!version)
            throw new Error('Box version not found');
        const items = await this.boxItemRepository.listByBoxVersionId(id);
        if (items.length > 0)
            throw new Error('Cannot delete box version that has items. Delete all box items first.');
        await this.boxVersionRepository.delete(id);
    }
}
exports.AdminDeleteBoxVersionUseCase = AdminDeleteBoxVersionUseCase;
//# sourceMappingURL=AdminDeleteBoxVersionUseCase.js.map