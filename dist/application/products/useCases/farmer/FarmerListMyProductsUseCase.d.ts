import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { ListMyProductsQuery } from '../../dtos/productDtos';
export declare class FarmerListMyProductsUseCase {
    private readonly farmerRepository;
    private readonly productRepository;
    constructor(farmerRepository: FarmerRepository, productRepository: ProductRepository);
    execute(userId: string, query: ListMyProductsQuery): Promise<{
        items: import("../../../../domain/products/Product").Product[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=FarmerListMyProductsUseCase.d.ts.map