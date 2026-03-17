import type { Harvest } from '../../../../domain/harvests/Harvest';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';

export class AdminGetHarvestUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findById(id);
    if (!harvest) throw new Error('Harvest not found');
    return harvest;
  }
}
