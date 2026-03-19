import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
export declare class AdminDeleteBoxVersionUseCase {
    private readonly boxVersionRepository;
    private readonly boxItemRepository;
    constructor(boxVersionRepository: BoxVersionRepository, boxItemRepository: BoxItemRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteBoxVersionUseCase.d.ts.map