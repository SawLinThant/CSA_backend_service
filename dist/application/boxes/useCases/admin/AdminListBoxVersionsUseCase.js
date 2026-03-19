"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListBoxVersionsUseCase = void 0;
class AdminListBoxVersionsUseCase {
    constructor(boxVersionRepository, boxRepository) {
        this.boxVersionRepository = boxVersionRepository;
        this.boxRepository = boxRepository;
    }
    async execute(query) {
        if (query.boxId) {
            const box = await this.boxRepository.findById(query.boxId);
            if (!box)
                throw new Error('Box not found');
        }
        const skip = (query.page - 1) * query.limit;
        const filters = query.boxId ? { boxId: query.boxId } : undefined;
        const { items, total } = await this.boxVersionRepository.list(skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.AdminListBoxVersionsUseCase = AdminListBoxVersionsUseCase;
//# sourceMappingURL=AdminListBoxVersionsUseCase.js.map