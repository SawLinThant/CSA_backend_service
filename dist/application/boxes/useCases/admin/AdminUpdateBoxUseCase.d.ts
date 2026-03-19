import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { UpdateBoxInput } from '../../dtos/boxDtos';
export declare class AdminUpdateBoxUseCase {
    private readonly boxRepository;
    constructor(boxRepository: BoxRepository);
    execute(id: string, input: UpdateBoxInput): Promise<import("../../../../domain/boxes/Box").Box>;
}
//# sourceMappingURL=AdminUpdateBoxUseCase.d.ts.map