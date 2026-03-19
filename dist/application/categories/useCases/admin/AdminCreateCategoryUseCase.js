"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateCategoryUseCase = void 0;
class AdminCreateCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(input) {
        const existing = await this.categoryRepository.findByName(input.name);
        if (existing)
            throw new Error('Category name already exists');
        return this.categoryRepository.create({
            name: input.name,
            description: input.description ?? null,
        });
    }
}
exports.AdminCreateCategoryUseCase = AdminCreateCategoryUseCase;
//# sourceMappingURL=AdminCreateCategoryUseCase.js.map