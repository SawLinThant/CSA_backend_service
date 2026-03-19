"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteCategoryUseCase = void 0;
class AdminDeleteCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new Error('Category not found');
        await this.categoryRepository.delete(id);
    }
}
exports.AdminDeleteCategoryUseCase = AdminDeleteCategoryUseCase;
//# sourceMappingURL=AdminDeleteCategoryUseCase.js.map