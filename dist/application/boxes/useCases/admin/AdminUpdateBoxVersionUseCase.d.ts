import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
import type { UpdateBoxVersionInput } from '../../dtos/boxVersionDtos';
export declare class AdminUpdateBoxVersionUseCase {
    private readonly boxVersionRepository;
    constructor(boxVersionRepository: BoxVersionRepository);
    execute(id: string, input: UpdateBoxVersionInput): Promise<import("../../../../domain/boxes/BoxVersion").BoxVersion>;
}
//# sourceMappingURL=AdminUpdateBoxVersionUseCase.d.ts.map