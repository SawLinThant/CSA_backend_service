import {
  createCategorySchema,
  updateCategorySchema,
  listCategoriesQuerySchema,
} from '../../../application/categories/dtos/categoryDtos';

export const categoryValidators = {
  createCategory: createCategorySchema,
  updateCategory: updateCategorySchema,
  listCategoriesQuery: listCategoriesQuerySchema,
};
