"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateBoxItemUseCase = void 0;
class AdminCreateBoxItemUseCase {
    constructor(boxItemRepository, boxVersionRepository, productRepository, farmerRepository) {
        this.boxItemRepository = boxItemRepository;
        this.boxVersionRepository = boxVersionRepository;
        this.productRepository = productRepository;
        this.farmerRepository = farmerRepository;
    }
    async execute(input) {
        const version = await this.boxVersionRepository.findById(input.boxVersionId);
        if (!version)
            throw new Error('Box version not found');
        const product = await this.productRepository.findById(input.productId);
        if (!product)
            throw new Error('Product not found');
        const farmer = await this.farmerRepository.findById(input.farmerId);
        if (!farmer)
            throw new Error('Farmer not found');
        if (product.farmerId !== input.farmerId) {
            throw new Error('Product does not belong to the specified farmer');
        }
        return this.boxItemRepository.create({
            boxVersionId: input.boxVersionId,
            productId: input.productId,
            farmerId: input.farmerId,
            quantity: input.quantity,
            optional: input.optional ?? false,
        });
    }
}
exports.AdminCreateBoxItemUseCase = AdminCreateBoxItemUseCase;
//# sourceMappingURL=AdminCreateBoxItemUseCase.js.map