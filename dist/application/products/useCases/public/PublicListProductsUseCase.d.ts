import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { ListPublicProductsQuery } from '../../dtos/productDtos';
export declare class PublicListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    execute(query: ListPublicProductsQuery): Promise<{
        items: import("../../../../domain/products/Product").Product[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=PublicListProductsUseCase.d.ts.map