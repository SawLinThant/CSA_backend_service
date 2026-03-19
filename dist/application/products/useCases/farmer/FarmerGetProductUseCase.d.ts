import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
export declare class FarmerGetProductUseCase {
    private readonly farmerRepository;
    private readonly productRepository;
    constructor(farmerRepository: FarmerRepository, productRepository: ProductRepository);
    execute(userId: string, productId: string): Promise<import("../../../../domain/products/Product").Product>;
}
//# sourceMappingURL=FarmerGetProductUseCase.d.ts.map