import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
export declare class FarmerDeleteProductUseCase {
    private readonly farmerRepository;
    private readonly productRepository;
    constructor(farmerRepository: FarmerRepository, productRepository: ProductRepository);
    execute(userId: string, productId: string): Promise<void>;
}
//# sourceMappingURL=FarmerDeleteProductUseCase.d.ts.map