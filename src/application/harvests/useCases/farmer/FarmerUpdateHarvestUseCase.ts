import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { UpdateHarvestInput } from '../../dtos/harvestDtos';

export class FarmerUpdateHarvestUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(userId: string, harvestId: string, input: UpdateHarvestInput) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const harvest = await this.harvestRepository.findByIdAndFarmerId(harvestId, farmer.id);
    if (!harvest) throw new Error('Harvest not found');
    if (harvest.status !== 'pending') throw new Error('Only pending harvests can be updated');

    return this.harvestRepository.update(harvestId, {
      ...(input.quantityAvailable !== undefined && { quantityAvailable: input.quantityAvailable }),
      ...(input.unitPrice !== undefined && { unitPrice: input.unitPrice }),
      ...(input.harvestDate !== undefined && { harvestDate: input.harvestDate }),
      ...(input.availableUntil !== undefined && { availableUntil: input.availableUntil }),
    });
  }
}
