import type { BoxVersion } from '../../../domain/boxes/BoxVersion';
import type { BoxVersionRepository, BoxVersionCreateData, BoxVersionUpdateData, BoxVersionListFilters } from '../../../domain/boxes/BoxVersionRepository';
export declare class PrismaBoxVersionRepository implements BoxVersionRepository {
    findById(id: string): Promise<BoxVersion | null>;
    list(skip: number, take: number, filters?: BoxVersionListFilters): Promise<{
        items: BoxVersion[];
        total: number;
    }>;
    create(data: BoxVersionCreateData): Promise<BoxVersion>;
    update(id: string, data: BoxVersionUpdateData): Promise<BoxVersion>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaBoxVersionRepository.d.ts.map