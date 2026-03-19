import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
export declare class AdminDeleteBoxUseCase {
    private readonly boxRepository;
    private readonly boxVersionRepository;
    constructor(boxRepository: BoxRepository, boxVersionRepository: BoxVersionRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteBoxUseCase.d.ts.map