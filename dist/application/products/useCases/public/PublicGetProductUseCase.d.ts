import type { Product } from '../../../../domain/products/Product';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
export declare class PublicGetProductUseCase {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    execute(id: string): Promise<Product>;
}
//# sourceMappingURL=PublicGetProductUseCase.d.ts.map