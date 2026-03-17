import type { Harvest } from '../../../../domain/harvests/Harvest';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';

export class FarmerGetHarvestUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(userId: string, harvestId: string): Promise<Harvest> {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const harvest = await this.harvestRepository.findByIdAndFarmerId(harvestId, farmer.id);
    if (!harvest) throw new Error('Harvest not found');
    return harvest;
  }
}
