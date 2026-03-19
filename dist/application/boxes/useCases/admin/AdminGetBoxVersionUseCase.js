"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetBoxVersionUseCase = void 0;
class AdminGetBoxVersionUseCase {
    constructor(boxVersionRepository) {
        this.boxVersionRepository = boxVersionRepository;
    }
    async execute(id) {
        const version = await this.boxVersionRepository.findById(id);
        if (!version)
            throw new Error('Box version not found');
        return version;
    }
}
exports.AdminGetBoxVersionUseCase = AdminGetBoxVersionUseCase;
//# sourceMappingURL=AdminGetBoxVersionUseCase.js.map