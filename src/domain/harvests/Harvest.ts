export type HarvestStatus = 'pending' | 'approved' | 'rejected';

export interface Harvest {
  id: string;
  farmerId: string;
  productId: string;
  quantityAvailable: number;
  unitPrice: number;
  harvestDate: Date;
  availableUntil: Date;
  status: HarvestStatus;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdAt: Date;
}
