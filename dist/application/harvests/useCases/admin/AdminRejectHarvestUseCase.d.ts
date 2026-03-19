import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
export declare class AdminRejectHarvestUseCase {
    private readonly harvestRepository;
    constructor(harvestRepository: HarvestRepository);
    execute(harvestId: string, adminUserId: string): Promise<import("../../../../domain/harvests/Harvest").Harvest>;
}
//# sourceMappingURL=AdminRejectHarvestUseCase.d.ts.map