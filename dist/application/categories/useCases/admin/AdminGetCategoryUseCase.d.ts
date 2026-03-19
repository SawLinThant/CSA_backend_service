import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
export declare class AdminGetCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    execute(id: string): Promise<import("../../../../domain/categories/Category").Category>;
}
//# sourceMappingURL=AdminGetCategoryUseCase.d.ts.map