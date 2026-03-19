import type { BoxItem } from '../../../../domain/boxes/BoxItem';
import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
export declare class AdminGetBoxItemUseCase {
    private readonly boxItemRepository;
    constructor(boxItemRepository: BoxItemRepository);
    execute(id: string): Promise<BoxItem>;
}
//# sourceMappingURL=AdminGetBoxItemUseCase.d.ts.map