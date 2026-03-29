import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { RecomputeBoxVersionCapacityInput } from '../../dtos/capacityDtos';
export declare class RecomputeBoxVersionCapacityUseCase {
    private readonly boxVersionRepository;
    private readonly boxItemRepository;
    private readonly capacitySnapshotRepository;
    constructor(boxVersionRepository: BoxVersionRepository, boxItemRepository: BoxItemRepository, capacitySnapshotRepository: CapacitySnapshotRepository);
    execute(boxVersionId: string, input: RecomputeBoxVersionCapacityInput): Promise<{
        snapshot: import("../../../../domain/capacity/CapacitySnapshot").CapacitySnapshot;
        debug: {
            reason: string;
            itemCaps: Array<{
                boxItemId: string;
                cap: number;
            }>;
        };
    }>;
}
//# sourceMappingURL=RecomputeBoxVersionCapacityUseCase.d.ts.map