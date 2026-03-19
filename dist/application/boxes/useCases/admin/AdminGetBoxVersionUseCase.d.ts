import type { BoxVersion } from '../../../../domain/boxes/BoxVersion';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
export declare class AdminGetBoxVersionUseCase {
    private readonly boxVersionRepository;
    constructor(boxVersionRepository: BoxVersionRepository);
    execute(id: string): Promise<BoxVersion>;
}
//# sourceMappingURL=AdminGetBoxVersionUseCase.d.ts.map