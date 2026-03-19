import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { CreateBoxInput } from '../../dtos/boxDtos';
export declare class AdminCreateBoxUseCase {
    private readonly boxRepository;
    constructor(boxRepository: BoxRepository);
    execute(input: CreateBoxInput): Promise<import("../../../../domain/boxes/Box").Box>;
}
//# sourceMappingURL=AdminCreateBoxUseCase.d.ts.map