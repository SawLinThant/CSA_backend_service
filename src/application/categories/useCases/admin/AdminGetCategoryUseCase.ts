import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';

export class AdminGetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
  }
}
