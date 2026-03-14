import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { UpdateCategoryInput } from '../../dtos/categoryDtos';

export class AdminUpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, input: UpdateCategoryInput) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new Error('Category not found');
    if (input.name !== undefined && input.name !== category.name) {
      const existing = await this.categoryRepository.findByName(input.name);
      if (existing) throw new Error('Category name already exists');
    }
    return this.categoryRepository.update(id, {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
    });
  }
}
