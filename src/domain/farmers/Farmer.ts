export interface Farmer {
  id: string;
  userId: string;
  farmName: string;
  farmLocation: string;
  farmDescription: string | null;
  approved: boolean;
  createdAt: Date;
}
