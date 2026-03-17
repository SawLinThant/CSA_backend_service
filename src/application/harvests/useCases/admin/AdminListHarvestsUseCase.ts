import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { ListHarvestsQuery } from '../../dtos/harvestDtos';

export class AdminListHarvestsUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute(query: ListHarvestsQuery) {
    const skip = (query.page - 1) * query.limit;
    const hasFilters =
      query.farmerId ||
      query.productId ||
      query.status !== undefined ||
      query.harvestDateFrom !== undefined ||
      query.harvestDateTo !== undefined;
    const filters = hasFilters
      ? {
          ...(query.farmerId && { farmerId: query.farmerId }),
          ...(query.productId && { productId: query.productId }),
          ...(query.status !== undefined && { status: query.status }),
          ...(query.harvestDateFrom !== undefined && { harvestDateFrom: query.harvestDateFrom }),
          ...(query.harvestDateTo !== undefined && { harvestDateTo: query.harvestDateTo }),
        }
      : undefined;
    const { items, total } = await this.harvestRepository.list(skip, query.limit, filters);
    return { items, total, page: query.page, limit: query.limit };
  }
}
