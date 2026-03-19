"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetBoxItemUseCase = void 0;
class AdminGetBoxItemUseCase {
    constructor(boxItemRepository) {
        this.boxItemRepository = boxItemRepository;
    }
    async execute(id) {
        const item = await this.boxItemRepository.findById(id);
        if (!item)
            throw new Error('Box item not found');
        return item;
    }
}
exports.AdminGetBoxItemUseCase = AdminGetBoxItemUseCase;
//# sourceMappingURL=AdminGetBoxItemUseCase.js.map