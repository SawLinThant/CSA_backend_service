export type CapacityStatus = 'open' | 'locked' | 'closed';
export interface CapacitySnapshot {
    id: string;
    boxVersionId: string;
    cycleDate: Date;
    maxBoxes: number;
    reservedBoxes: number;
    consumedBoxes: number;
    status: CapacityStatus;
    createdAt: Date;
    updatedAt: Date;
}
/** Snapshot row returned from paginated admin list (includes related box version label). */
export interface CapacitySnapshotListItem extends CapacitySnapshot {
    boxVersionName: string;
}
//# sourceMappingURL=CapacitySnapshot.d.ts.map