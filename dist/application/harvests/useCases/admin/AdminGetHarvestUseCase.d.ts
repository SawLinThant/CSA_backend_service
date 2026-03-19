import type { Harvest } from '../../../../domain/harvests/Harvest';
import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
export declare class AdminGetHarvestUseCase {
    private readonly harvestRepository;
    constructor(harvestRepository: HarvestRepository);
    execute(id: string): Promise<Harvest>;
}
//# sourceMappingURL=AdminGetHarvestUseCase.d.ts.map