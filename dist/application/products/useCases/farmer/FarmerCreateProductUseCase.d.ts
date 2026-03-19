import type { CategoryRepository } from '../../../../domain/categories/CategoryRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { CreateProductInput } from '../../dtos/productDtos';
export declare class FarmerCreateProductUseCase {
    private readonly farmerRepository;
    private readonly categoryRepository;
    private readonly productRepository;
    constructor(farmerRepository: FarmerRepository, categoryRepository: CategoryRepository, productRepository: ProductRepository);
    execute(userId: string, input: CreateProductInput): Promise<import("../../../../domain/products/Product").Product>;
}
//# sourceMappingURL=FarmerCreateProductUseCase.d.ts.map