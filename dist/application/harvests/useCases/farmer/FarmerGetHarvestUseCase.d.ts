import type { Harvest } from '../../../../domain/harvests/Harvest';
import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
export declare class FarmerGetHarvestUseCase {
    private readonly farmerRepository;
    private readonly harvestRepository;
    constructor(farmerRepository: FarmerRepository, harvestRepository: HarvestRepository);
    execute(userId: string, harvestId: string): Promise<Harvest>;
}
//# sourceMappingURL=FarmerGetHarvestUseCase.d.ts.map