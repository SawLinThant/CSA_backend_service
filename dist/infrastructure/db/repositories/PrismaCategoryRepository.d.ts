import type { Category } from '../../../domain/categories/Category';
import type { CategoryRepository, CategoryCreateData, CategoryUpdateData, CategoryListFilters } from '../../../domain/categories/CategoryRepository';
export declare class PrismaCategoryRepository implements CategoryRepository {
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    list(skip: number, take: number, filters?: CategoryListFilters): Promise<{
        items: Category[];
        total: number;
    }>;
    create(data: CategoryCreateData): Promise<Category>;
    update(id: string, data: CategoryUpdateData): Promise<Category>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaCategoryRepository.d.ts.map