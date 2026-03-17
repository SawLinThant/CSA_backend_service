export interface BoxVersion {
  id: string;
  boxId: string;
  versionName: string;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
}
