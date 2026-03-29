import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { ListCapacitySnapshotsQuery } from '../../dtos/capacityDtos';
export declare class AdminListCapacitySnapshotsUseCase {
    private readonly capacitySnapshotRepository;
    constructor(capacitySnapshotRepository: CapacitySnapshotRepository);
    execute(query: ListCapacitySnapshotsQuery): Promise<{
        items: import("../../../../domain/capacity/CapacitySnapshot").CapacitySnapshotListItem[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListCapacitySnapshotsUseCase.d.ts.map