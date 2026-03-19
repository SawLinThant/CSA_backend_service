"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListBoxItemsUseCase = void 0;
class AdminListBoxItemsUseCase {
    constructor(boxItemRepository, boxVersionRepository) {
        this.boxItemRepository = boxItemRepository;
        this.boxVersionRepository = boxVersionRepository;
    }
    async execute(boxVersionId) {
        const version = await this.boxVersionRepository.findById(boxVersionId);
        if (!version)
            throw new Error('Box version not found');
        return this.boxItemRepository.listByBoxVersionId(boxVersionId);
    }
}
exports.AdminListBoxItemsUseCase = AdminListBoxItemsUseCase;
//# sourceMappingURL=AdminListBoxItemsUseCase.js.map