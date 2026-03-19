import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { ProductRepository } from '../../../../domain/products/ProductRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { CreateHarvestInput } from '../../dtos/harvestDtos';
export declare class FarmerCreateHarvestUseCase {
    private readonly farmerRepository;
    private readonly productRepository;
    private readonly harvestRepository;
    constructor(farmerRepository: FarmerRepository, productRepository: ProductRepository, harvestRepository: HarvestRepository);
    execute(userId: string, input: CreateHarvestInput): Promise<import("../../../../domain/harvests/Harvest").Harvest>;
}
//# sourceMappingURL=FarmerCreateHarvestUseCase.d.ts.map