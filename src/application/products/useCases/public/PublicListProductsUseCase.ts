import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { ListPublicProductsQuery } from '../../dtos/productDtos';

export class PublicListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: ListPublicProductsQuery) {
    const skip = (query.page - 1) * query.limit;
    const filters =
      query.name || query.categoryId || query.isActive !== undefined
        ? {
            ...(query.name && { name: query.name }),
            ...(query.categoryId && { categoryId: query.categoryId }),
            ...(query.isActive !== undefined && { isActive: query.isActive }),
          }
        : undefined;
    const { items, total } = await this.productRepository.list(skip, query.limit, filters);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
