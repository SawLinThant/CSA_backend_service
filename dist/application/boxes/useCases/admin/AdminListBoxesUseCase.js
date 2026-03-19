"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListBoxesUseCase = void 0;
class AdminListBoxesUseCase {
    constructor(boxRepository) {
        this.boxRepository = boxRepository;
    }
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const filters = query.name !== undefined || query.isActive !== undefined
            ? {
                ...(query.name && { name: query.name }),
                ...(query.isActive !== undefined && { isActive: query.isActive }),
            }
            : undefined;
        const { items, total } = await this.boxRepository.list(skip, query.limit, filters);
        return { items, total, page: query.page, limit: query.limit };
    }
}
exports.AdminListBoxesUseCase = AdminListBoxesUseCase;
//# sourceMappingURL=AdminListBoxesUseCase.js.map