"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidators = void 0;
const categoryDtos_1 = require("../../../application/categories/dtos/categoryDtos");
exports.categoryValidators = {
    createCategory: categoryDtos_1.createCategorySchema,
    updateCategory: categoryDtos_1.updateCategorySchema,
    listCategoriesQuery: categoryDtos_1.listCategoriesQuerySchema,
};
//# sourceMappingURL=categoryValidators.js.map