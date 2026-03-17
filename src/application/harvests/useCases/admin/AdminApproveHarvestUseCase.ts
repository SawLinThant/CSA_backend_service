import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';

export class AdminApproveHarvestUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute(harvestId: string, adminUserId: string) {
    const harvest = await this.harvestRepository.findById(harvestId);
    if (!harvest) throw new Error('Harvest not found');
    if (harvest.status !== 'pending') throw new Error('Only pending harvests can be approved');
    return this.harvestRepository.setApproval(harvestId, 'approved', adminUserId);
  }
}
