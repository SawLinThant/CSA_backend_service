"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListCapacitySnapshotsUseCase = void 0;
class AdminListCapacitySnapshotsUseCase {
    constructor(capacitySnapshotRepository) {
        this.capacitySnapshotRepository = capacitySnapshotRepository;
    }
    async execute(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const filters = {};
        if (query.boxVersionId !== undefined)
            filters.boxVersionId = query.boxVersionId;
        if (query.status !== undefined)
            filters.status = query.status;
        if (query.cycleDateFrom !== undefined)
            filters.cycleDateFrom = query.cycleDateFrom;
        if (query.cycleDateTo !== undefined)
            filters.cycleDateTo = query.cycleDateTo;
        const { items, total } = await this.capacitySnapshotRepository.list(skip, limit, filters);
        return { items, total, page, limit };
    }
}
exports.AdminListCapacitySnapshotsUseCase = AdminListCapacitySnapshotsUseCase;
//# sourceMappingURL=AdminListCapacitySnapshotsUseCase.js.map