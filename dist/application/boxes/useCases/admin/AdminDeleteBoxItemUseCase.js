"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteBoxItemUseCase = void 0;
class AdminDeleteBoxItemUseCase {
    constructor(boxItemRepository) {
        this.boxItemRepository = boxItemRepository;
    }
    async execute(id) {
        const item = await this.boxItemRepository.findById(id);
        if (!item)
            throw new Error('Box item not found');
        await this.boxItemRepository.delete(id);
    }
}
exports.AdminDeleteBoxItemUseCase = AdminDeleteBoxItemUseCase;
//# sourceMappingURL=AdminDeleteBoxItemUseCase.js.map