"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicGetProductUseCase = void 0;
class PublicGetProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        const product = await this.productRepository.findById(id);
        if (!product)
            throw new Error('Product not found');
        return product;
    }
}
exports.PublicGetProductUseCase = PublicGetProductUseCase;
//# sourceMappingURL=PublicGetProductUseCase.js.map