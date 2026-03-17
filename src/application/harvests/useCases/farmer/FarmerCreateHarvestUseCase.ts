import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { CreateHarvestInput } from '../../dtos/harvestDtos';

export class FarmerCreateHarvestUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly productRepository: ProductRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(userId: string, input: CreateHarvestInput) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const product = await this.productRepository.findByIdAndFarmerId(input.productId, farmer.id);
    if (!product) throw new Error('Product not found');

    return this.harvestRepository.create({
      farmerId: farmer.id,
      productId: input.productId,
      quantityAvailable: input.quantityAvailable,
      unitPrice: input.unitPrice,
      harvestDate: input.harvestDate,
      availableUntil: input.availableUntil,
    });
  }
}
