import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
export declare class AdminDeleteBoxItemUseCase {
    private readonly boxItemRepository;
    constructor(boxItemRepository: BoxItemRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteBoxItemUseCase.d.ts.map