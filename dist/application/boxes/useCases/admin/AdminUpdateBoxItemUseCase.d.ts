import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { UpdateBoxItemInput } from '../../dtos/boxItemDtos';
export declare class AdminUpdateBoxItemUseCase {
    private readonly boxItemRepository;
    constructor(boxItemRepository: BoxItemRepository);
    execute(id: string, input: UpdateBoxItemInput): Promise<import("../../../../domain/boxes/BoxItem").BoxItem>;
}
//# sourceMappingURL=AdminUpdateBoxItemUseCase.d.ts.map