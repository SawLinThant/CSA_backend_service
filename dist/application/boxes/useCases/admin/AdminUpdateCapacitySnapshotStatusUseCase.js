"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateCapacitySnapshotStatusUseCase = void 0;
class AdminUpdateCapacitySnapshotStatusUseCase {
    constructor(capacitySnapshotRepository) {
        this.capacitySnapshotRepository = capacitySnapshotRepository;
    }
    async execute(id, input) {
        const snapshot = await this.capacitySnapshotRepository.findById(id);
        if (!snapshot)
            throw new Error('Capacity snapshot not found');
        return this.capacitySnapshotRepository.update(id, { status: input.status });
    }
}
exports.AdminUpdateCapacitySnapshotStatusUseCase = AdminUpdateCapacitySnapshotStatusUseCase;
//# sourceMappingURL=AdminUpdateCapacitySnapshotStatusUseCase.js.map