import type { Request, Response } from 'express';
import { PrismaCategoryRepository } from '../../../infrastructure/db/repositories/PrismaCategoryRepository';
import { AdminListCategoriesUseCase } from '../../../application/categories/useCases/admin/AdminListCategoriesUseCase';
import { AdminGetCategoryUseCase } from '../../../application/categories/useCases/admin/AdminGetCategoryUseCase';
import { AdminCreateCategoryUseCase } from '../../../application/categories/useCases/admin/AdminCreateCategoryUseCase';
import { AdminUpdateCategoryUseCase } from '../../../application/categories/useCases/admin/AdminUpdateCategoryUseCase';
import { AdminDeleteCategoryUseCase } from '../../../application/categories/useCases/admin/AdminDeleteCategoryUseCase';
import { categoryValidators } from '../validators/categoryValidators';

const categoryRepository = new PrismaCategoryRepository();
const adminListCategoriesUseCase = new AdminListCategoriesUseCase(categoryRepository);
const adminGetCategoryUseCase = new AdminGetCategoryUseCase(categoryRepository);
const adminCreateCategoryUseCase = new AdminCreateCategoryUseCase(categoryRepository);
const adminUpdateCategoryUseCase = new AdminUpdateCategoryUseCase(categoryRepository);
const adminDeleteCategoryUseCase = new AdminDeleteCategoryUseCase(categoryRepository);

export class CategoryController {
  async adminListCategories(req: Request, res: Response) {
    const parseResult = categoryValidators.listCategoriesQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListCategoriesUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminGetCategory(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Category id required' });
    try {
      const result = await adminGetCategoryUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateCategory(req: Request, res: Response) {
    const parseResult = categoryValidators.createCategory.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateCategoryUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
    }
  }

  async adminUpdateCategory(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Category id required' });
    const parseResult = categoryValidators.updateCategory.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateCategoryUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
  }

  async adminDeleteCategory(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Category id required' });
    try {
      await adminDeleteCategoryUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }
}
