import type { Box } from '../../../../domain/boxes/Box';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
export declare class AdminGetBoxUseCase {
    private readonly boxRepository;
    constructor(boxRepository: BoxRepository);
    execute(id: string): Promise<Box>;
}
//# sourceMappingURL=AdminGetBoxUseCase.d.ts.map