"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidators = void 0;
const productDtos_1 = require("../../../application/products/dtos/productDtos");
exports.productValidators = {
    createProduct: productDtos_1.createProductSchema,
    createProductFormBody: productDtos_1.createProductFormBodySchema,
    imageMetaArray: productDtos_1.productImageMetaItemSchema.array(),
    updateProduct: productDtos_1.updateProductSchema,
    updateProductFormBody: productDtos_1.updateProductFormBodySchema,
    listMyProductsQuery: productDtos_1.listMyProductsQuerySchema,
    listPublicProductsQuery: productDtos_1.listPublicProductsQuerySchema,
};
//# sourceMappingURL=productValidators.js.map