import type { CapacitySnapshot, CapacitySnapshotListItem, CapacityStatus } from './CapacitySnapshot';
export interface CapacitySnapshotCreateData {
    boxVersionId: string;
    cycleDate: Date;
    maxBoxes: number;
    status?: CapacityStatus;
}
export interface CapacitySnapshotUpdateData {
    maxBoxes?: number;
    reservedBoxes?: number;
    consumedBoxes?: number;
    status?: CapacityStatus;
}
export interface CapacitySnapshotListFilters {
    boxVersionId?: string;
    status?: CapacityStatus;
    cycleDateFrom?: Date;
    cycleDateTo?: Date;
}
export interface CapacitySnapshotRepository {
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
//# sourceMappingURL=CapacitySnapshotRepository.d.ts.map