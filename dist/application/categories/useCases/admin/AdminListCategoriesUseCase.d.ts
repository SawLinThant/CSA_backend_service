import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { ListCategoriesQuery } from '../../dtos/categoryDtos';
export declare class AdminListCategoriesUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    execute(query: ListCategoriesQuery): Promise<{
        items: import("../../../../domain/categories/Category").Category[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListCategoriesUseCase.d.ts.map