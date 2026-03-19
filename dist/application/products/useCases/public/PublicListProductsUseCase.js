"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicListProductsUseCase = void 0;
class PublicListProductsUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const filters = query.name || query.categoryId || query.isActive !== undefined
            ? {
                ...(query.name && { name: query.name }),
                ...(query.categoryId && { categoryId: query.categoryId }),
                ...(query.isActive !== undefined && { isActive: query.isActive }),
            }
            : undefined;
        const { items, total } = await this.productRepository.list(skip, query.limit, filters);
        return {
            items,
            total,
            page: query.page,
            limit: query.limit,
        };
    }
}
exports.PublicListProductsUseCase = PublicListProductsUseCase;
//# sourceMappingURL=PublicListProductsUseCase.js.map