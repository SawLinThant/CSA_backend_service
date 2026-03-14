import type { Product } from '../../../../domain/products/Product';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';

export class PublicGetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }
}
