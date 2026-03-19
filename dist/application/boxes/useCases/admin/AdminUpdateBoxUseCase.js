"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateBoxUseCase = void 0;
class AdminUpdateBoxUseCase {
    constructor(boxRepository) {
        this.boxRepository = boxRepository;
    }
    async execute(id, input) {
        const box = await this.boxRepository.findById(id);
        if (!box)
            throw new Error('Box not found');
        return this.boxRepository.update(id, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.description !== undefined && { description: input.description }),
            ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
            ...(input.isActive !== undefined && { isActive: input.isActive }),
        });
    }
}
exports.AdminUpdateBoxUseCase = AdminUpdateBoxUseCase;
//# sourceMappingURL=AdminUpdateBoxUseCase.js.map