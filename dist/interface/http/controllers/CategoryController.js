"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const PrismaCategoryRepository_1 = require("../../../infrastructure/db/repositories/PrismaCategoryRepository");
const AdminListCategoriesUseCase_1 = require("../../../application/categories/useCases/admin/AdminListCategoriesUseCase");
const AdminGetCategoryUseCase_1 = require("../../../application/categories/useCases/admin/AdminGetCategoryUseCase");
const AdminCreateCategoryUseCase_1 = require("../../../application/categories/useCases/admin/AdminCreateCategoryUseCase");
const AdminUpdateCategoryUseCase_1 = require("../../../application/categories/useCases/admin/AdminUpdateCategoryUseCase");
const AdminDeleteCategoryUseCase_1 = require("../../../application/categories/useCases/admin/AdminDeleteCategoryUseCase");
const categoryValidators_1 = require("../validators/categoryValidators");
const categoryRepository = new PrismaCategoryRepository_1.PrismaCategoryRepository();
const adminListCategoriesUseCase = new AdminListCategoriesUseCase_1.AdminListCategoriesUseCase(categoryRepository);
const adminGetCategoryUseCase = new AdminGetCategoryUseCase_1.AdminGetCategoryUseCase(categoryRepository);
const adminCreateCategoryUseCase = new AdminCreateCategoryUseCase_1.AdminCreateCategoryUseCase(categoryRepository);
const adminUpdateCategoryUseCase = new AdminUpdateCategoryUseCase_1.AdminUpdateCategoryUseCase(categoryRepository);
const adminDeleteCategoryUseCase = new AdminDeleteCategoryUseCase_1.AdminDeleteCategoryUseCase(categoryRepository);
class CategoryController {
    async adminListCategories(req, res) {
        const parseResult = categoryValidators_1.categoryValidators.listCategoriesQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListCategoriesUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminGetCategory(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Category id required' });
        try {
            const result = await adminGetCategoryUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateCategory(req, res) {
        const parseResult = categoryValidators_1.categoryValidators.createCategory.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateCategoryUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
        }
    }
    async adminUpdateCategory(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Category id required' });
        const parseResult = categoryValidators_1.categoryValidators.updateCategory.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateCategoryUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
        }
    }
    async adminDeleteCategory(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Category id required' });
        try {
            await adminDeleteCategoryUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map