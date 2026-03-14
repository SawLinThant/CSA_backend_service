import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { UpdateProductInput } from '../../dtos/productDtos';

export class FarmerUpdateProductUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(userId: string, productId: string, input: UpdateProductInput) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const product = await this.productRepository.findByIdAndFarmerId(productId, farmer.id);
    if (!product) throw new Error('Product not found');

    if (input.categoryId !== undefined) {
      const category = await this.categoryRepository.findById(input.categoryId);
      if (!category) throw new Error('Category not found');
    }

    return this.productRepository.update(
      productId,
      {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
        ...(input.unit !== undefined && { unit: input.unit }),
        ...(input.basePrice !== undefined && { basePrice: input.basePrice }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
      input.images,
    );
  }
}
