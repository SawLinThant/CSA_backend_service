export type ReservationStatus = 'reserved' | 'consumed' | 'released' | 'expired';

export interface InventoryReservation {
  id: string;
  subscriptionId: string;
  boxVersionId: string;
  capacitySnapshotId: string;
  cycleDate: Date;
  quantity: number;
  status: ReservationStatus;
  reason: string | null;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
}

