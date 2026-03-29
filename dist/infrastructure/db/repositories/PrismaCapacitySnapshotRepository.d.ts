import type { CapacitySnapshot, CapacitySnapshotListItem } from '../../../domain/capacity/CapacitySnapshot';
import type { CapacitySnapshotRepository, CapacitySnapshotCreateData, CapacitySnapshotUpdateData, CapacitySnapshotListFilters } from '../../../domain/capacity/CapacitySnapshotRepository';
export declare class PrismaCapacitySnapshotRepository implements CapacitySnapshotRepository {
    findById(id: string): Promise<CapacitySnapshot | null>;
    findByBoxVersionAndCycleDate(boxVersionId: string, cycleDate: Date): Promise<CapacitySnapshot | null>;
    create(data: CapacitySnapshotCreateData): Promise<CapacitySnapshot>;
    upsertForCycle(data: CapacitySnapshotCreateData): Promise<CapacitySnapshot>;
    update(id: string, data: CapacitySnapshotUpdateData): Promise<CapacitySnapshot>;
    incrementReserved(id: string, by: number): Promise<CapacitySnapshot>;
    incrementConsumed(id: string, by: number): Promise<CapacitySnapshot>;
    list(skip: number, take: number, filters?: CapacitySnapshotListFilters): Promise<{
        items: CapacitySnapshotListItem[];
        total: number;
    }>;
}
//# sourceMappingURL=PrismaCapacitySnapshotRepository.d.ts.map