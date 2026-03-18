import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { PrismaFarmerRepository } from '../../../infrastructure/db/repositories/PrismaFarmerRepository';
import { PrismaCategoryRepository } from '../../../infrastructure/db/repositories/PrismaCategoryRepository';
import { PrismaProductRepository } from '../../../infrastructure/db/repositories/PrismaProductRepository';
import { FarmerListMyProductsUseCase } from '../../../application/products/useCases/farmer/FarmerListMyProductsUseCase';
import { FarmerGetProductUseCase } from '../../../application/products/useCases/farmer/FarmerGetProductUseCase';
import { FarmerCreateProductUseCase } from '../../../application/products/useCases/farmer/FarmerCreateProductUseCase';
import { FarmerUpdateProductUseCase } from '../../../application/products/useCases/farmer/FarmerUpdateProductUseCase';
import { FarmerDeleteProductUseCase } from '../../../application/products/useCases/farmer/FarmerDeleteProductUseCase';
import { PublicListProductsUseCase } from '../../../application/products/useCases/public/PublicListProductsUseCase';
import { PublicGetProductUseCase } from '../../../application/products/useCases/public/PublicGetProductUseCase';
import { productValidators } from '../validators/productValidators';
import { getImageExtension } from '../../../infrastructure/storage/S3StorageService';
import { getStorageService } from '../../../infrastructure/storage/storageFactory';

const farmerRepository = new PrismaFarmerRepository();
const categoryRepository = new PrismaCategoryRepository();
const productRepository = new PrismaProductRepository();

const farmerListMyProductsUseCase = new FarmerListMyProductsUseCase(farmerRepository, productRepository);
const farmerGetProductUseCase = new FarmerGetProductUseCase(farmerRepository, productRepository);
const publicListProductsUseCase = new PublicListProductsUseCase(productRepository);
const publicGetProductUseCase = new PublicGetProductUseCase(productRepository);
const farmerCreateProductUseCase = new FarmerCreateProductUseCase(
  farmerRepository,
  categoryRepository,
  productRepository,
);
const farmerUpdateProductUseCase = new FarmerUpdateProductUseCase(
  farmerRepository,
  categoryRepository,
  productRepository,
);
const farmerDeleteProductUseCase = new FarmerDeleteProductUseCase(farmerRepository, productRepository);
const storage = getStorageService();

export class ProductController {
  async publicListProducts(req: Request, res: Response) {
    const parseResult = productValidators.listPublicProductsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await publicListProductsUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async publicGetProduct(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Product id required' });
    try {
      const result = await publicGetProductUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      return res.status(404).json({ error: message });
    }
  }

  async farmerListMyProducts(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = productValidators.listMyProductsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await farmerListMyProductsUseCase.execute(req.user.id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async farmerGetProduct(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Product id required' });
    try {
      const result = await farmerGetProductUseCase.execute(req.user.id, id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      return res.status(404).json({ error: message });
    }
  }

  async farmerCreateProduct(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = productValidators.createProduct.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await farmerCreateProductUseCase.execute(req.user.id, parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async farmerCreateProductWithUpload(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const files = (req as Request & { files?: Express.Multer.File[] }).files;
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required (field: images)' });
    }
    const parseResult = productValidators.createProductFormBody.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    const userId = req.user.id;
    let metaList: Array<{ isPrimary?: boolean; sortOrder?: number }> = [];
    if (parseResult.data.imageMeta) {
      try {
        const parsed = JSON.parse(parseResult.data.imageMeta) as unknown;
        const metaResult = productValidators.imageMetaArray.safeParse(parsed);
        if (!metaResult.success) {
          return res.status(400).json({ error: 'Invalid imageMeta', details: metaResult.error.format() });
        }
        if (metaResult.data.length !== files.length) {
          return res.status(400).json({
            error: `imageMeta length (${metaResult.data.length}) must match number of uploaded images (${files.length})`,
          });
        }
        metaList = metaResult.data.map((m) => ({
          ...(m.isPrimary !== undefined && { isPrimary: m.isPrimary }),
          ...(m.sortOrder !== undefined && { sortOrder: m.sortOrder }),
        }));
      } catch {
        return res.status(400).json({ error: 'imageMeta must be a valid JSON array' });
      }
    }
    try {
      const imageUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        const ext = getImageExtension(file.mimetype);
        const key = `products/${userId}/${Date.now()}-${randomUUID()}${ext}`;
        const url = await storage.uploadImage({
          buffer: file.buffer,
          key,
          contentType: file.mimetype,
        });
        imageUrls.push(url);
      }
      const hasExplicitPrimary = metaList.some((m) => m.isPrimary === true);
      const images = imageUrls.map((imageUrl, i) => {
        const meta = metaList[i];
        const isPrimary = meta?.isPrimary ?? (!hasExplicitPrimary && i === 0);
        const sortOrder = meta?.sortOrder ?? i;
        return { imageUrl, isPrimary, sortOrder };
      });
      const result = await farmerCreateProductUseCase.execute(userId, {
        ...parseResult.data,
        images,
      });
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async farmerUpdateProduct(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Product id required' });
    const parseResult = productValidators.updateProduct.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await farmerUpdateProductUseCase.execute(req.user.id, id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async farmerUpdateProductWithUpload(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Product id required' });
    const files = (req as Request & { files?: Express.Multer.File[] }).files;
    const fileList = Array.isArray(files) ? files : [];

    const parseResult = productValidators.updateProductFormBody.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    const data: Parameters<typeof farmerUpdateProductUseCase.execute>[2] = {};
    if (parseResult.data.name !== undefined) data.name = parseResult.data.name;
    if (parseResult.data.description !== undefined) data.description = parseResult.data.description;
    if (parseResult.data.categoryId !== undefined) data.categoryId = parseResult.data.categoryId;
    if (parseResult.data.unit !== undefined) data.unit = parseResult.data.unit;
    if (parseResult.data.basePrice !== undefined) data.basePrice = parseResult.data.basePrice;
    if (parseResult.data.isActive !== undefined) data.isActive = parseResult.data.isActive;

    if (fileList.length > 0) {
      let metaList: Array<{ isPrimary?: boolean; sortOrder?: number }> = [];
      if (parseResult.data.imageMeta) {
        try {
          const parsed = JSON.parse(parseResult.data.imageMeta) as unknown;
          const metaResult = productValidators.imageMetaArray.safeParse(parsed);
          if (!metaResult.success) {
            return res.status(400).json({ error: 'Invalid imageMeta', details: metaResult.error.format() });
          }
          if (metaResult.data.length !== fileList.length) {
            return res.status(400).json({
              error: `imageMeta length (${metaResult.data.length}) must match number of uploaded images (${fileList.length})`,
            });
          }
          metaList = metaResult.data.map((m) => ({
            ...(m.isPrimary !== undefined && { isPrimary: m.isPrimary }),
            ...(m.sortOrder !== undefined && { sortOrder: m.sortOrder }),
          }));
        } catch {
          return res.status(400).json({ error: 'imageMeta must be a valid JSON array' });
        }
      }
      try {
        const userId = req.user.id;
        const imageUrls: string[] = [];
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          if (!file) continue;
          const ext = getImageExtension(file.mimetype);
          const key = `products/${userId}/${Date.now()}-${randomUUID()}${ext}`;
          const url = await storage.uploadImage({
            buffer: file.buffer,
            key,
            contentType: file.mimetype,
          });
          imageUrls.push(url);
        }
        const hasExplicitPrimary = metaList.some((m) => m.isPrimary === true);
        data.images = imageUrls.map((imageUrl, i) => {
          const meta = metaList[i];
          const isPrimary = meta?.isPrimary ?? (!hasExplicitPrimary && i === 0);
          const sortOrder = meta?.sortOrder ?? i;
          return { imageUrl, isPrimary, sortOrder };
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
        return res.status(400).json({ error: message });
      }
    }

    try {
      const result = await farmerUpdateProductUseCase.execute(req.user.id, id, data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async farmerDeleteProduct(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Product id required' });
    try {
      await farmerDeleteProductUseCase.execute(req.user.id, id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }
}
