import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { CreateCategoryInput } from '../../dtos/categoryDtos';

export class AdminCreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const existing = await this.categoryRepository.findByName(input.name);
    if (existing) throw new Error('Category name already exists');
    return this.categoryRepository.create({
      name: input.name,
      description: input.description ?? null,
    });
  }
}
