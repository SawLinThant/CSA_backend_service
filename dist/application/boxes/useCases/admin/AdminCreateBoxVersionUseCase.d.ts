import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateBoxVersionInput } from '../../dtos/boxVersionDtos';
export declare class AdminCreateBoxVersionUseCase {
    private readonly boxVersionRepository;
    private readonly boxRepository;
    constructor(boxVersionRepository: BoxVersionRepository, boxRepository: BoxRepository);
    execute(input: CreateBoxVersionInput): Promise<import("../../../../domain/boxes/BoxVersion").BoxVersion>;
}
//# sourceMappingURL=AdminCreateBoxVersionUseCase.d.ts.map