import type { HarvestRepository } from '../../../../domain/harvests/HarvestRepository';
export declare class AdminApproveHarvestUseCase {
    private readonly harvestRepository;
    constructor(harvestRepository: HarvestRepository);
    execute(harvestId: string, adminUserId: string): Promise<import("../../../../domain/harvests/Harvest").Harvest>;
}
//# sourceMappingURL=AdminApproveHarvestUseCase.d.ts.map