import {
  createProductSchema,
  createProductFormBodySchema,
  productImageMetaItemSchema,
  updateProductSchema,
  updateProductFormBodySchema,
  listMyProductsQuerySchema,
  listPublicProductsQuerySchema,
} from '../../../application/products/dtos/productDtos';

export const productValidators = {
  createProduct: createProductSchema,
  createProductFormBody: createProductFormBodySchema,
  imageMetaArray: productImageMetaItemSchema.array(),
  updateProduct: updateProductSchema,
  updateProductFormBody: updateProductFormBodySchema,
  listMyProductsQuery: listMyProductsQuerySchema,
  listPublicProductsQuery: listPublicProductsQuerySchema,
};
