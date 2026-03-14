import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';

export class FarmerGetProductUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(userId: string, productId: string) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const product = await this.productRepository.findByIdAndFarmerId(productId, farmer.id);
    if (!product) throw new Error('Product not found');
    return product;
  }
}
