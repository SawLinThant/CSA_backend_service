import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { ListMyHarvestsQuery } from '../../dtos/harvestDtos';

export class FarmerListMyHarvestsUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(userId: string, query: ListMyHarvestsQuery) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const skip = (query.page - 1) * query.limit;
    const hasFilters =
      query.productId ||
      query.status !== undefined ||
      query.harvestDateFrom !== undefined ||
      query.harvestDateTo !== undefined;
    const filters = hasFilters
      ? {
          ...(query.productId && { productId: query.productId }),
          ...(query.status !== undefined && { status: query.status }),
          ...(query.harvestDateFrom !== undefined && { harvestDateFrom: query.harvestDateFrom }),
          ...(query.harvestDateTo !== undefined && { harvestDateTo: query.harvestDateTo }),
        }
      : undefined;
    const { items, total } = await this.harvestRepository.listByFarmerId(
      farmer.id,
      skip,
      query.limit,
      filters,
    );
    return { items, total, page: query.page, limit: query.limit };
  }
}
