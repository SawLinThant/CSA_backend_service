"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateCategoryUseCase = void 0;
class AdminUpdateCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id, input) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new Error('Category not found');
        if (input.name !== undefined && input.name !== category.name) {
            const existing = await this.categoryRepository.findByName(input.name);
            if (existing)
                throw new Error('Category name already exists');
        }
        return this.categoryRepository.update(id, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.description !== undefined && { description: input.description }),
        });
    }
}
exports.AdminUpdateCategoryUseCase = AdminUpdateCategoryUseCase;
//# sourceMappingURL=AdminUpdateCategoryUseCase.js.map