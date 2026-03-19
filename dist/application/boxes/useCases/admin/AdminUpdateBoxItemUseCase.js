"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateBoxItemUseCase = void 0;
class AdminUpdateBoxItemUseCase {
    constructor(boxItemRepository) {
        this.boxItemRepository = boxItemRepository;
    }
    async execute(id, input) {
        const item = await this.boxItemRepository.findById(id);
        if (!item)
            throw new Error('Box item not found');
        return this.boxItemRepository.update(id, {
            ...(input.quantity !== undefined && { quantity: input.quantity }),
            ...(input.optional !== undefined && { optional: input.optional }),
        });
    }
}
exports.AdminUpdateBoxItemUseCase = AdminUpdateBoxItemUseCase;
//# sourceMappingURL=AdminUpdateBoxItemUseCase.js.map