import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { CreateCategoryInput } from '../../dtos/categoryDtos';
export declare class AdminCreateCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    execute(input: CreateCategoryInput): Promise<import("../../../../domain/categories/Category").Category>;
}
//# sourceMappingURL=AdminCreateCategoryUseCase.d.ts.map