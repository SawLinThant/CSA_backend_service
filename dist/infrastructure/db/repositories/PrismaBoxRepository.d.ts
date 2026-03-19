import type { Box } from '../../../domain/boxes/Box';
import type { BoxRepository, BoxCreateData, BoxUpdateData, BoxListFilters } from '../../../domain/boxes/BoxRepository';
export declare class PrismaBoxRepository implements BoxRepository {
    findById(id: string): Promise<Box | null>;
    list(skip: number, take: number, filters?: BoxListFilters): Promise<{
        items: Box[];
        total: number;
    }>;
    create(data: BoxCreateData): Promise<Box>;
    update(id: string, data: BoxUpdateData): Promise<Box>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaBoxRepository.d.ts.map