import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListBoxVersionsQuery } from '../../dtos/boxVersionDtos';
export declare class AdminListBoxVersionsUseCase {
    private readonly boxVersionRepository;
    private readonly boxRepository;
    constructor(boxVersionRepository: BoxVersionRepository, boxRepository: BoxRepository);
    execute(query: ListBoxVersionsQuery): Promise<{
        items: import("../../../../domain/boxes/BoxVersion").BoxVersion[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListBoxVersionsUseCase.d.ts.map