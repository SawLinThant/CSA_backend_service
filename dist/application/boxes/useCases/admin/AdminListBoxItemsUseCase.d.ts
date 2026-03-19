import type { BoxItemRepository } from '../../../../domain/boxes/BoxItemRepository';
import type { BoxVersionRepository } from '../../../../domain/boxes/BoxVersionRepository';
export declare class AdminListBoxItemsUseCase {
    private readonly boxItemRepository;
    private readonly boxVersionRepository;
    constructor(boxItemRepository: BoxItemRepository, boxVersionRepository: BoxVersionRepository);
    execute(boxVersionId: string): Promise<import("../../../../domain/boxes/BoxItem").BoxItem[]>;
}
//# sourceMappingURL=AdminListBoxItemsUseCase.d.ts.map