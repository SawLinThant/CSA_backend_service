"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetBoxUseCase = void 0;
class AdminGetBoxUseCase {
    constructor(boxRepository) {
        this.boxRepository = boxRepository;
    }
    async execute(id) {
        const box = await this.boxRepository.findById(id);
        if (!box)
            throw new Error('Box not found');
        return box;
    }
}
exports.AdminGetBoxUseCase = AdminGetBoxUseCase;
//# sourceMappingURL=AdminGetBoxUseCase.js.map