import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListBoxesQuery } from '../../dtos/boxDtos';
export declare class AdminListBoxesUseCase {
    private readonly boxRepository;
    constructor(boxRepository: BoxRepository);
    execute(query: ListBoxesQuery): Promise<{
        items: import("../../../../domain/boxes/Box").Box[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListBoxesUseCase.d.ts.map