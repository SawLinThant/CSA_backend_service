import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { ListCategoriesQuery } from '../../dtos/categoryDtos';

export class AdminListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: ListCategoriesQuery) {
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
