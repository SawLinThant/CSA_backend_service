import type { BoxVersion } from './BoxVersion';

export type BoxVersionCreateData = Omit<BoxVersion, 'id' | 'createdAt'>;
export type BoxVersionUpdateData = Partial<Pick<BoxVersion, 'versionName' | 'startDate' | 'endDate'>>;

export interface BoxVersionListFilters {
  boxId?: string;
}

export interface BoxVersionRepository {
  findById(id: string): Promise<BoxVersion | null>;
  list(skip: number, take: number, filters?: BoxVersionListFilters): Promise<{ items: BoxVersion[]; total: number }>;
  create(data: BoxVersionCreateData): Promise<BoxVersion>;
  update(id: string, data: BoxVersionUpdateData): Promise<BoxVersion>;
  delete(id: string): Promise<void>;
}
