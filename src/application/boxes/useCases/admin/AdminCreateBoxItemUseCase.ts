import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { CreateBoxItemInput } from '../../dtos/boxItemDtos';

export class AdminCreateBoxItemUseCase {
  constructor(
    private readonly boxItemRepository: BoxItemRepository,
    private readonly boxVersionRepository: BoxVersionRepository,
    private readonly productRepository: ProductRepository,
    private readonly farmerRepository: FarmerRepository,
  ) {}

  async execute(input: CreateBoxItemInput) {
    const version = await this.boxVersionRepository.findById(input.boxVersionId);
    if (!version) throw new Error('Box version not found');

    const product = await this.productRepository.findById(input.productId);
    if (!product) throw new Error('Product not found');

    const farmer = await this.farmerRepository.findById(input.farmerId);
    if (!farmer) throw new Error('Farmer not found');

    if (product.farmerId !== input.farmerId) {
      throw new Error('Product does not belong to the specified farmer');
    }

    return this.boxItemRepository.create({
      boxVersionId: input.boxVersionId,
      productId: input.productId,
      farmerId: input.farmerId,
      quantity: input.quantity,
      optional: input.optional ?? false,
    });
  }
}
