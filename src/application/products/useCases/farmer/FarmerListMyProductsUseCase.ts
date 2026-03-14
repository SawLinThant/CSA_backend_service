import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { ListMyProductsQuery } from '../../dtos/productDtos';

export class FarmerListMyProductsUseCase {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(userId: string, query: ListMyProductsQuery) {
    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    const skip = (query.page - 1) * query.limit;
    const filters =
      query.name ?? query.categoryId ?? query.isActive !== undefined
        ? {
            ...(query.name && { name: query.name }),
            ...(query.categoryId && { categoryId: query.categoryId }),
            ...(query.isActive !== undefined && { isActive: query.isActive }),
          }
        : undefined;

    const { items, total } = await this.productRepository.listByFarmerId(
      farmer.id,
      skip,
      query.limit,
      filters,
    );

    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
