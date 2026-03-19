import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { CreateBoxItemInput } from '../../dtos/boxItemDtos';
export declare class AdminCreateBoxItemUseCase {
    private readonly boxItemRepository;
    private readonly boxVersionRepository;
    private readonly productRepository;
    private readonly farmerRepository;
    constructor(boxItemRepository: BoxItemRepository, boxVersionRepository: BoxVersionRepository, productRepository: ProductRepository, farmerRepository: FarmerRepository);
    execute(input: CreateBoxItemInput): Promise<import("../../../../domain/boxes/BoxItem").BoxItem>;
}
//# sourceMappingURL=AdminCreateBoxItemUseCase.d.ts.map