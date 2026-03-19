"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetCategoryUseCase = void 0;
class AdminGetCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new Error('Category not found');
        return category;
    }
}
exports.AdminGetCategoryUseCase = AdminGetCategoryUseCase;
//# sourceMappingURL=AdminGetCategoryUseCase.js.map