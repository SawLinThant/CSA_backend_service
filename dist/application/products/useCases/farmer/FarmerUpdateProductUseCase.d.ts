import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { UpdateProductInput } from '../../dtos/productDtos';
export declare class FarmerUpdateProductUseCase {
    private readonly farmerRepository;
    private readonly categoryRepository;
    private readonly productRepository;
    constructor(farmerRepository: FarmerRepository, categoryRepository: CategoryRepository, productRepository: ProductRepository);
    execute(userId: string, productId: string, input: UpdateProductInput): Promise<import("../../../../domain/products/Product").Product>;
}
//# sourceMappingURL=FarmerUpdateProductUseCase.d.ts.map