import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { CreateProductInput } from '../../dtos/productDtos';

export class FarmerCreateProductUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(userId: string, input: CreateProductInput) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) throw new Error('Category not found');

    return this.productRepository.create(
      {
        farmerId: farmer.id,
        categoryId: input.categoryId,
        name: input.name,
        description: input.description ?? null,
        unit: input.unit,
        basePrice: input.basePrice,
        isActive: true,
      },
      input.images?.length ? input.images : undefined,
    );
  }
}
