"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateBoxUseCase = void 0;
class AdminCreateBoxUseCase {
    constructor(boxRepository) {
        this.boxRepository = boxRepository;
    }
    async execute(input) {
        return this.boxRepository.create({
            name: input.name,
            description: input.description ?? null,
            imageUrl: input.imageUrl ?? null,
            isActive: input.isActive ?? true,
        });
    }
}
exports.AdminCreateBoxUseCase = AdminCreateBoxUseCase;
//# sourceMappingURL=AdminCreateBoxUseCase.js.map