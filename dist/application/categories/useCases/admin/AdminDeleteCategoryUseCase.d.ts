import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
export declare class AdminDeleteCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteCategoryUseCase.d.ts.map