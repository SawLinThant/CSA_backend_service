import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
import type { ListHarvestsQuery } from '../../dtos/harvestDtos';
export declare class AdminListHarvestsUseCase {
    private readonly harvestRepository;
    constructor(harvestRepository: HarvestRepository);
    execute(query: ListHarvestsQuery): Promise<{
        items: import("../../../../domain/harvests/Harvest").Harvest[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListHarvestsUseCase.d.ts.map