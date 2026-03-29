import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { ListHarvestsQuery } from '../../dtos/harvestDtos';

export class AdminListHarvestsUseCase {
  constructor(
    private readonly harvestRepository: HarvestRepository,
    private readonly farmerRepository: FarmerRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

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

    const farmerIds = Array.from(new Set(items.map((h) => h.farmerId)));
    const productIds = Array.from(new Set(items.map((h) => h.productId)));

    const farmerNameById: Record<string, string> = {};
    await Promise.all(
      farmerIds.map(async (farmerId) => {
        const farmer = await this.farmerRepository.findById(farmerId);
        if (!farmer) return;
        const user = await this.userRepository.findById(farmer.userId);
        if (!user) return;
        farmerNameById[farmerId] = user.name;
      }),
    );

    const productNameById: Record<string, string> = {};
    await Promise.all(
      productIds.map(async (productId) => {
        const product = await this.productRepository.findById(productId);
        if (!product) return;
        productNameById[productId] = product.name;
      }),
    );

    const enrichedItems = items.map((h) => ({
      ...h,
      farmerName: farmerNameById[h.farmerId] ?? null,
      productName: productNameById[h.productId] ?? null,
    }));

    return { items: enrichedItems, total, page: query.page, limit: query.limit };
  }
}
