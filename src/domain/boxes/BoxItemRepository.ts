import type { BoxItem } from './BoxItem';

export type BoxItemCreateData = Omit<BoxItem, 'id'>;
export type BoxItemUpdateData = Partial<Pick<BoxItem, 'quantity' | 'optional'>>;

export interface BoxItemRepository {
  findById(id: string): Promise<BoxItem | null>;
  listByBoxVersionId(boxVersionId: string): Promise<BoxItem[]>;
  create(data: BoxItemCreateData): Promise<BoxItem>;
  update(id: string, data: BoxItemUpdateData): Promise<BoxItem>;
  delete(id: string): Promise<void>;
}
