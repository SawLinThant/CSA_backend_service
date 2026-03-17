import type { Box } from './Box';

export type BoxCreateData = Pick<Box, 'name'> & Partial<Pick<Box, 'description' | 'imageUrl' | 'isActive'>>;
export type BoxUpdateData = Partial<Pick<Box, 'name' | 'description' | 'imageUrl' | 'isActive'>>;

export interface BoxListFilters {
  name?: string;
  isActive?: boolean;
}

export interface BoxRepository {
  findById(id: string): Promise<Box | null>;
  list(skip: number, take: number, filters?: BoxListFilters): Promise<{ items: Box[]; total: number }>;
  create(data: BoxCreateData): Promise<Box>;
  update(id: string, data: BoxUpdateData): Promise<Box>;
  delete(id: string): Promise<void>;
}
