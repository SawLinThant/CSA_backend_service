"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const crypto_1 = require("crypto");
const PrismaFarmerRepository_1 = require("../../../infrastructure/db/repositories/PrismaFarmerRepository");
const PrismaCategoryRepository_1 = require("../../../infrastructure/db/repositories/PrismaCategoryRepository");
const PrismaProductRepository_1 = require("../../../infrastructure/db/repositories/PrismaProductRepository");
const FarmerListMyProductsUseCase_1 = require("../../../application/products/useCases/farmer/FarmerListMyProductsUseCase");
const FarmerGetProductUseCase_1 = require("../../../application/products/useCases/farmer/FarmerGetProductUseCase");
const FarmerCreateProductUseCase_1 = require("../../../application/products/useCases/farmer/FarmerCreateProductUseCase");
const FarmerUpdateProductUseCase_1 = require("../../../application/products/useCases/farmer/FarmerUpdateProductUseCase");
const FarmerDeleteProductUseCase_1 = require("../../../application/products/useCases/farmer/FarmerDeleteProductUseCase");
const PublicListProductsUseCase_1 = require("../../../application/products/useCases/public/PublicListProductsUseCase");
const PublicGetProductUseCase_1 = require("../../../application/products/useCases/public/PublicGetProductUseCase");
const productValidators_1 = require("../validators/productValidators");
const S3StorageService_1 = require("../../../infrastructure/storage/S3StorageService");
const storageFactory_1 = require("../../../infrastructure/storage/storageFactory");
const farmerRepository = new PrismaFarmerRepository_1.PrismaFarmerRepository();
const categoryRepository = new PrismaCategoryRepository_1.PrismaCategoryRepository();
const productRepository = new PrismaProductRepository_1.PrismaProductRepository();
const farmerListMyProductsUseCase = new FarmerListMyProductsUseCase_1.FarmerListMyProductsUseCase(farmerRepository, productRepository);
const farmerGetProductUseCase = new FarmerGetProductUseCase_1.FarmerGetProductUseCase(farmerRepository, productRepository);
const publicListProductsUseCase = new PublicListProductsUseCase_1.PublicListProductsUseCase(productRepository);
const publicGetProductUseCase = new PublicGetProductUseCase_1.PublicGetProductUseCase(productRepository);
const farmerCreateProductUseCase = new FarmerCreateProductUseCase_1.FarmerCreateProductUseCase(farmerRepository, categoryRepository, productRepository);
const farmerUpdateProductUseCase = new FarmerUpdateProductUseCase_1.FarmerUpdateProductUseCase(farmerRepository, categoryRepository, productRepository);
const farmerDeleteProductUseCase = new FarmerDeleteProductUseCase_1.FarmerDeleteProductUseCase(farmerRepository, productRepository);
const storage = (0, storageFactory_1.getStorageService)();
class ProductController {
    async publicListProducts(req, res) {
        const parseResult = productValidators_1.productValidators.listPublicProductsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await publicListProductsUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async publicGetProduct(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Product id required' });
        try {
            const result = await publicGetProductUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            return res.status(404).json({ error: message });
        }
    }
    async farmerListMyProducts(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = productValidators_1.productValidators.listMyProductsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await farmerListMyProductsUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async farmerGetProduct(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Product id required' });
        try {
            const result = await farmerGetProductUseCase.execute(req.user.id, id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            return res.status(404).json({ error: message });
        }
    }
    async farmerCreateProduct(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = productValidators_1.productValidators.createProduct.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await farmerCreateProductUseCase.execute(req.user.id, parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async farmerCreateProductWithUpload(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const files = req.files;
        if (!Array.isArray(files) || files.length === 0) {
            return res.status(400).json({ error: 'At least one image file is required (field: images)' });
        }
        const parseResult = productValidators_1.productValidators.createProductFormBody.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        const userId = req.user.id;
        let metaList = [];
        if (parseResult.data.imageMeta) {
            try {
                const parsed = JSON.parse(parseResult.data.imageMeta);
                const metaResult = productValidators_1.productValidators.imageMetaArray.safeParse(parsed);
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
            }
            catch {
                return res.status(400).json({ error: 'imageMeta must be a valid JSON array' });
            }
        }
        try {
            const imageUrls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file)
                    continue;
                const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
                const key = `products/${userId}/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('configured') || message.includes('upload failed'))
                return res.status(503).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async farmerUpdateProduct(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Product id required' });
        const parseResult = productValidators_1.productValidators.updateProduct.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await farmerUpdateProductUseCase.execute(req.user.id, id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async farmerUpdateProductWithUpload(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Product id required' });
        const files = req.files;
        const fileList = Array.isArray(files) ? files : [];
        const parseResult = productValidators_1.productValidators.updateProductFormBody.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        const data = {};
        if (parseResult.data.name !== undefined)
            data.name = parseResult.data.name;
        if (parseResult.data.description !== undefined)
            data.description = parseResult.data.description;
        if (parseResult.data.categoryId !== undefined)
            data.categoryId = parseResult.data.categoryId;
        if (parseResult.data.unit !== undefined)
            data.unit = parseResult.data.unit;
        if (parseResult.data.basePrice !== undefined)
            data.basePrice = parseResult.data.basePrice;
        if (parseResult.data.isActive !== undefined)
            data.isActive = parseResult.data.isActive;
        if (fileList.length > 0) {
            let metaList = [];
            if (parseResult.data.imageMeta) {
                try {
                    const parsed = JSON.parse(parseResult.data.imageMeta);
                    const metaResult = productValidators_1.productValidators.imageMetaArray.safeParse(parsed);
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
                }
                catch {
                    return res.status(400).json({ error: 'imageMeta must be a valid JSON array' });
                }
            }
            try {
                const userId = req.user.id;
                const imageUrls = [];
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    if (!file)
                        continue;
                    const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
                    const key = `products/${userId}/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
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
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Upload failed';
                if (message.includes('configured') || message.includes('upload failed'))
                    return res.status(503).json({ error: message });
                return res.status(400).json({ error: message });
            }
        }
        try {
            const result = await farmerUpdateProductUseCase.execute(req.user.id, id, data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async farmerDeleteProduct(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Product id required' });
        try {
            await farmerDeleteProductUseCase.execute(req.user.id, id);
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
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map