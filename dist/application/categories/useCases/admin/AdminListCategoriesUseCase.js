"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListCategoriesUseCase = void 0;
class AdminListCategoriesUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const filters = query.name ? { name: query.name } : undefined;
        const { items, total } = await this.categoryRepository.list(skip, query.limit, filters);
        return {
            items,
            total,
            page: query.page,
            limit: query.limit,
        };
    }
}
exports.AdminListCategoriesUseCase = AdminListCategoriesUseCase;
//# sourceMappingURL=AdminListCategoriesUseCase.js.map