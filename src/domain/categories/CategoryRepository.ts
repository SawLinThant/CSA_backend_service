import type { Category } from './Category';

export type CategoryCreateData = Pick<Category, 'name' | 'description'>;
export type CategoryUpdateData = Partial<Pick<Category, 'name' | 'description'>>;

export interface CategoryListFilters {
  name?: string;
}

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  list(skip: number, take: number, filters?: CategoryListFilters): Promise<{ items: Category[]; total: number }>;
  create(data: CategoryCreateData): Promise<Category>;
  update(id: string, data: CategoryUpdateData): Promise<Category>;
  delete(id: string): Promise<void>;
}
