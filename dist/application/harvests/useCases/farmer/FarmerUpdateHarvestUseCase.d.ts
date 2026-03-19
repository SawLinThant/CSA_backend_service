import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { UpdateHarvestInput } from '../../dtos/harvestDtos';
export declare class FarmerUpdateHarvestUseCase {
    private readonly farmerRepository;
    private readonly harvestRepository;
    constructor(farmerRepository: FarmerRepository, harvestRepository: HarvestRepository);
    execute(userId: string, harvestId: string, input: UpdateHarvestInput): Promise<import("../../../../domain/harvests/Harvest").Harvest>;
}
//# sourceMappingURL=FarmerUpdateHarvestUseCase.d.ts.map