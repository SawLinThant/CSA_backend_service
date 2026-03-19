import type { BoxItem } from '../../../domain/boxes/BoxItem';
import type { BoxItemRepository, BoxItemCreateData, BoxItemUpdateData } from '../../../domain/boxes/BoxItemRepository';
export declare class PrismaBoxItemRepository implements BoxItemRepository {
    findById(id: string): Promise<BoxItem | null>;
    listByBoxVersionId(boxVersionId: string): Promise<BoxItem[]>;
    create(data: BoxItemCreateData): Promise<BoxItem>;
    update(id: string, data: BoxItemUpdateData): Promise<BoxItem>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaBoxItemRepository.d.ts.map