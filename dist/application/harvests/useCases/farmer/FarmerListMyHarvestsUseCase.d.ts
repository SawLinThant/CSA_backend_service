import type { FarmerRepository } from '../../../../domain/farmers/FarmerRepository';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { ListMyHarvestsQuery } from '../../dtos/harvestDtos';
export declare class FarmerListMyHarvestsUseCase {
    private readonly farmerRepository;
    private readonly harvestRepository;
    constructor(farmerRepository: FarmerRepository, harvestRepository: HarvestRepository);
    execute(userId: string, query: ListMyHarvestsQuery): Promise<{
        items: import("../../../../domain/harvests/Harvest").Harvest[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=FarmerListMyHarvestsUseCase.d.ts.map