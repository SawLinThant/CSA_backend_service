"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListInventoryReservationsUseCase = void 0;
class AdminListInventoryReservationsUseCase {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const filters = {};
        if (query.status !== undefined)
            filters.status = query.status;
        if (query.cycleDateFrom !== undefined)
            filters.cycleDateFrom = query.cycleDateFrom;
        if (query.cycleDateTo !== undefined)
            filters.cycleDateTo = query.cycleDateTo;
        const { items, total } = await this.reservationRepository.list(skip, limit, filters);
        return { items, total, page, limit };
    }
}
exports.AdminListInventoryReservationsUseCase = AdminListInventoryReservationsUseCase;
//# sourceMappingURL=AdminListInventoryReservationsUseCase.js.map