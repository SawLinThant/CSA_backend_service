import type { CapacitySnapshotRepository } from '../../../../domain/capacity/CapacitySnapshotRepository';
import type { UpdateCapacitySnapshotStatusInput } from '../../dtos/capacityDtos';
export declare class AdminUpdateCapacitySnapshotStatusUseCase {
    private readonly capacitySnapshotRepository;
    constructor(capacitySnapshotRepository: CapacitySnapshotRepository);
    execute(id: string, input: UpdateCapacitySnapshotStatusInput): Promise<import("../../../../domain/capacity/CapacitySnapshot").CapacitySnapshot>;
}
//# sourceMappingURL=AdminUpdateCapacitySnapshotStatusUseCase.d.ts.map