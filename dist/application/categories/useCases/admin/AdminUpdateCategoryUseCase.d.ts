import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { UpdateCategoryInput } from '../../dtos/categoryDtos';
export declare class AdminUpdateCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    execute(id: string, input: UpdateCategoryInput): Promise<import("../../../../domain/categories/Category").Category>;
}
//# sourceMappingURL=AdminUpdateCategoryUseCase.d.ts.map