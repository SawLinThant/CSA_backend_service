"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxController = void 0;
const crypto_1 = require("crypto");
const PrismaBoxRepository_1 = require("../../../infrastructure/db/repositories/PrismaBoxRepository");
const PrismaBoxVersionRepository_1 = require("../../../infrastructure/db/repositories/PrismaBoxVersionRepository");
const PrismaBoxItemRepository_1 = require("../../../infrastructure/db/repositories/PrismaBoxItemRepository");
const PrismaProductRepository_1 = require("../../../infrastructure/db/repositories/PrismaProductRepository");
const PrismaFarmerRepository_1 = require("../../../infrastructure/db/repositories/PrismaFarmerRepository");
const AdminListBoxesUseCase_1 = require("../../../application/boxes/useCases/admin/AdminListBoxesUseCase");
const AdminGetBoxUseCase_1 = require("../../../application/boxes/useCases/admin/AdminGetBoxUseCase");
const AdminCreateBoxUseCase_1 = require("../../../application/boxes/useCases/admin/AdminCreateBoxUseCase");
const AdminUpdateBoxUseCase_1 = require("../../../application/boxes/useCases/admin/AdminUpdateBoxUseCase");
const AdminDeleteBoxUseCase_1 = require("../../../application/boxes/useCases/admin/AdminDeleteBoxUseCase");
const AdminListBoxVersionsUseCase_1 = require("../../../application/boxes/useCases/admin/AdminListBoxVersionsUseCase");
const AdminGetBoxVersionUseCase_1 = require("../../../application/boxes/useCases/admin/AdminGetBoxVersionUseCase");
const AdminCreateBoxVersionUseCase_1 = require("../../../application/boxes/useCases/admin/AdminCreateBoxVersionUseCase");
const AdminUpdateBoxVersionUseCase_1 = require("../../../application/boxes/useCases/admin/AdminUpdateBoxVersionUseCase");
const AdminDeleteBoxVersionUseCase_1 = require("../../../application/boxes/useCases/admin/AdminDeleteBoxVersionUseCase");
const AdminListBoxItemsUseCase_1 = require("../../../application/boxes/useCases/admin/AdminListBoxItemsUseCase");
const AdminGetBoxItemUseCase_1 = require("../../../application/boxes/useCases/admin/AdminGetBoxItemUseCase");
const AdminCreateBoxItemUseCase_1 = require("../../../application/boxes/useCases/admin/AdminCreateBoxItemUseCase");
const AdminUpdateBoxItemUseCase_1 = require("../../../application/boxes/useCases/admin/AdminUpdateBoxItemUseCase");
const AdminDeleteBoxItemUseCase_1 = require("../../../application/boxes/useCases/admin/AdminDeleteBoxItemUseCase");
const boxValidators_1 = require("../validators/boxValidators");
const S3StorageService_1 = require("../../../infrastructure/storage/S3StorageService");
const storageFactory_1 = require("../../../infrastructure/storage/storageFactory");
const boxRepository = new PrismaBoxRepository_1.PrismaBoxRepository();
const boxVersionRepository = new PrismaBoxVersionRepository_1.PrismaBoxVersionRepository();
const boxItemRepository = new PrismaBoxItemRepository_1.PrismaBoxItemRepository();
const productRepository = new PrismaProductRepository_1.PrismaProductRepository();
const farmerRepository = new PrismaFarmerRepository_1.PrismaFarmerRepository();
const adminListBoxesUseCase = new AdminListBoxesUseCase_1.AdminListBoxesUseCase(boxRepository);
const adminGetBoxUseCase = new AdminGetBoxUseCase_1.AdminGetBoxUseCase(boxRepository);
const adminCreateBoxUseCase = new AdminCreateBoxUseCase_1.AdminCreateBoxUseCase(boxRepository);
const adminUpdateBoxUseCase = new AdminUpdateBoxUseCase_1.AdminUpdateBoxUseCase(boxRepository);
const adminDeleteBoxUseCase = new AdminDeleteBoxUseCase_1.AdminDeleteBoxUseCase(boxRepository, boxVersionRepository);
const adminListBoxVersionsUseCase = new AdminListBoxVersionsUseCase_1.AdminListBoxVersionsUseCase(boxVersionRepository, boxRepository);
const adminGetBoxVersionUseCase = new AdminGetBoxVersionUseCase_1.AdminGetBoxVersionUseCase(boxVersionRepository);
const adminCreateBoxVersionUseCase = new AdminCreateBoxVersionUseCase_1.AdminCreateBoxVersionUseCase(boxVersionRepository, boxRepository);
const adminUpdateBoxVersionUseCase = new AdminUpdateBoxVersionUseCase_1.AdminUpdateBoxVersionUseCase(boxVersionRepository);
const adminDeleteBoxVersionUseCase = new AdminDeleteBoxVersionUseCase_1.AdminDeleteBoxVersionUseCase(boxVersionRepository, boxItemRepository);
const adminListBoxItemsUseCase = new AdminListBoxItemsUseCase_1.AdminListBoxItemsUseCase(boxItemRepository, boxVersionRepository);
const adminGetBoxItemUseCase = new AdminGetBoxItemUseCase_1.AdminGetBoxItemUseCase(boxItemRepository);
const adminCreateBoxItemUseCase = new AdminCreateBoxItemUseCase_1.AdminCreateBoxItemUseCase(boxItemRepository, boxVersionRepository, productRepository, farmerRepository);
const adminUpdateBoxItemUseCase = new AdminUpdateBoxItemUseCase_1.AdminUpdateBoxItemUseCase(boxItemRepository);
const adminDeleteBoxItemUseCase = new AdminDeleteBoxItemUseCase_1.AdminDeleteBoxItemUseCase(boxItemRepository);
const storage = (0, storageFactory_1.getStorageService)();
class BoxController {
    async adminListBoxes(req, res) {
        const parseResult = boxValidators_1.boxValidators.listBoxesQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListBoxesUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminGetBox(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box id required' });
        try {
            const result = await adminGetBoxUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateBox(req, res) {
        const parseResult = boxValidators_1.boxValidators.createBox.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateBoxUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
        }
    }
    async adminCreateBoxWithUpload(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'Image file is required (field: image)' });
        }
        // Parse form-data fields. Multer puts them in req.body as strings.
        const parseResult = boxValidators_1.boxValidators.createBox.safeParse({
            name: req.body?.name,
            description: req.body?.description ?? null,
            isActive: typeof req.body?.isActive === 'string'
                ? req.body.isActive === 'true'
                : req.body?.isActive,
            imageUrl: null,
        });
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
            const key = `boxes/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
            const imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
            const result = await adminCreateBoxUseCase.execute({ ...parseResult.data, imageUrl });
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('configured') || message.includes('upload failed'))
                return res.status(503).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpdateBox(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box id required' });
        const parseResult = boxValidators_1.boxValidators.updateBox.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateBoxUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpdateBoxWithUpload(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box id required' });
        const file = req.file;
        // Parse form-data fields. Multer puts them in req.body as strings.
        const parseResult = boxValidators_1.boxValidators.updateBox.safeParse({
            name: req.body?.name,
            description: req.body?.description,
            isActive: typeof req.body?.isActive === 'string'
                ? req.body.isActive === 'true'
                : req.body?.isActive,
            // imageUrl comes from uploaded file (if present), so don't accept it from the form body here.
        });
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            let imageUrl;
            if (file) {
                const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
                const key = `boxes/${id}/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
                imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
            }
            const result = await adminUpdateBoxUseCase.execute(id, {
                ...parseResult.data,
                ...(imageUrl !== undefined && { imageUrl }),
            });
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('configured') || message.includes('upload failed'))
                return res.status(503).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminDeleteBox(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box id required' });
        try {
            await adminDeleteBoxUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminListBoxVersions(req, res) {
        const parseResult = boxValidators_1.boxValidators.listBoxVersionsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListBoxVersionsUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async adminGetBoxVersion(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box version id required' });
        try {
            const result = await adminGetBoxVersionUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateBoxVersion(req, res) {
        const parseResult = boxValidators_1.boxValidators.createBoxVersion.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateBoxVersionUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpdateBoxVersion(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box version id required' });
        const parseResult = boxValidators_1.boxValidators.updateBoxVersion.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateBoxVersionUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminDeleteBoxVersion(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box version id required' });
        try {
            await adminDeleteBoxVersionUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminListBoxVersionItems(req, res) {
        const versionId = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!versionId)
            return res.status(400).json({ error: 'Box version id required' });
        try {
            const result = await adminListBoxItemsUseCase.execute(versionId);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async adminGetBoxItem(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box item id required' });
        try {
            const result = await adminGetBoxItemUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateBoxItem(req, res) {
        const parseResult = boxValidators_1.boxValidators.createBoxItem.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateBoxItemUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found') || message.includes('does not belong'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminUpdateBoxItem(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box item id required' });
        const parseResult = boxValidators_1.boxValidators.updateBoxItem.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateBoxItemUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminDeleteBoxItem(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box item id required' });
        try {
            await adminDeleteBoxItemUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async publicListBoxes(req, res) {
        const parseResult = boxValidators_1.boxValidators.listBoxesQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListBoxesUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async publicGetBox(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box id required' });
        try {
            const result = await adminGetBoxUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async publicListBoxVersions(req, res) {
        const parseResult = boxValidators_1.boxValidators.listBoxVersionsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListBoxVersionsUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async publicGetBoxVersion(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Box version id required' });
        try {
            const result = await adminGetBoxVersionUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async publicListBoxVersionItems(req, res) {
        const versionId = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!versionId)
            return res.status(400).json({ error: 'Box version id required' });
        try {
            const result = await adminListBoxItemsUseCase.execute(versionId);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
}
exports.BoxController = BoxController;
//# sourceMappingURL=BoxController.js.map