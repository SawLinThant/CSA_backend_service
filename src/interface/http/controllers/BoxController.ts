import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { PrismaBoxRepository } from '../../../infrastructure/db/repositories/PrismaBoxRepository';
import { PrismaBoxVersionRepository } from '../../../infrastructure/db/repositories/PrismaBoxVersionRepository';
import { PrismaBoxItemRepository } from '../../../infrastructure/db/repositories/PrismaBoxItemRepository';
import { PrismaProductRepository } from '../../../infrastructure/db/repositories/PrismaProductRepository';
import { PrismaFarmerRepository } from '../../../infrastructure/db/repositories/PrismaFarmerRepository';
import { AdminListBoxesUseCase } from '../../../application/boxes/useCases/admin/AdminListBoxesUseCase';
import { AdminGetBoxUseCase } from '../../../application/boxes/useCases/admin/AdminGetBoxUseCase';
import { AdminCreateBoxUseCase } from '../../../application/boxes/useCases/admin/AdminCreateBoxUseCase';
import { AdminUpdateBoxUseCase } from '../../../application/boxes/useCases/admin/AdminUpdateBoxUseCase';
import { AdminDeleteBoxUseCase } from '../../../application/boxes/useCases/admin/AdminDeleteBoxUseCase';
import { AdminListBoxVersionsUseCase } from '../../../application/boxes/useCases/admin/AdminListBoxVersionsUseCase';
import { AdminGetBoxVersionUseCase } from '../../../application/boxes/useCases/admin/AdminGetBoxVersionUseCase';
import { AdminCreateBoxVersionUseCase } from '../../../application/boxes/useCases/admin/AdminCreateBoxVersionUseCase';
import { AdminUpdateBoxVersionUseCase } from '../../../application/boxes/useCases/admin/AdminUpdateBoxVersionUseCase';
import { AdminDeleteBoxVersionUseCase } from '../../../application/boxes/useCases/admin/AdminDeleteBoxVersionUseCase';
import { AdminListBoxItemsUseCase } from '../../../application/boxes/useCases/admin/AdminListBoxItemsUseCase';
import { AdminGetBoxItemUseCase } from '../../../application/boxes/useCases/admin/AdminGetBoxItemUseCase';
import { AdminCreateBoxItemUseCase } from '../../../application/boxes/useCases/admin/AdminCreateBoxItemUseCase';
import { AdminUpdateBoxItemUseCase } from '../../../application/boxes/useCases/admin/AdminUpdateBoxItemUseCase';
import { AdminDeleteBoxItemUseCase } from '../../../application/boxes/useCases/admin/AdminDeleteBoxItemUseCase';
import { boxValidators } from '../validators/boxValidators';
import { getImageExtension } from '../../../infrastructure/storage/S3StorageService';
import { getStorageService } from '../../../infrastructure/storage/storageFactory';

const boxRepository = new PrismaBoxRepository();
const boxVersionRepository = new PrismaBoxVersionRepository();
const boxItemRepository = new PrismaBoxItemRepository();
const productRepository = new PrismaProductRepository();
const farmerRepository = new PrismaFarmerRepository();

const adminListBoxesUseCase = new AdminListBoxesUseCase(boxRepository);
const adminGetBoxUseCase = new AdminGetBoxUseCase(boxRepository);
const adminCreateBoxUseCase = new AdminCreateBoxUseCase(boxRepository);
const adminUpdateBoxUseCase = new AdminUpdateBoxUseCase(boxRepository);
const adminDeleteBoxUseCase = new AdminDeleteBoxUseCase(boxRepository, boxVersionRepository);

const adminListBoxVersionsUseCase = new AdminListBoxVersionsUseCase(boxVersionRepository, boxRepository);
const adminGetBoxVersionUseCase = new AdminGetBoxVersionUseCase(boxVersionRepository);
const adminCreateBoxVersionUseCase = new AdminCreateBoxVersionUseCase(boxVersionRepository, boxRepository);
const adminUpdateBoxVersionUseCase = new AdminUpdateBoxVersionUseCase(boxVersionRepository);
const adminDeleteBoxVersionUseCase = new AdminDeleteBoxVersionUseCase(boxVersionRepository, boxItemRepository);

const adminListBoxItemsUseCase = new AdminListBoxItemsUseCase(boxItemRepository, boxVersionRepository);
const adminGetBoxItemUseCase = new AdminGetBoxItemUseCase(boxItemRepository);
const adminCreateBoxItemUseCase = new AdminCreateBoxItemUseCase(
  boxItemRepository,
  boxVersionRepository,
  productRepository,
  farmerRepository,
);
const adminUpdateBoxItemUseCase = new AdminUpdateBoxItemUseCase(boxItemRepository);
const adminDeleteBoxItemUseCase = new AdminDeleteBoxItemUseCase(boxItemRepository);
const storage = getStorageService();

export class BoxController {
  async adminListBoxes(req: Request, res: Response) {
    const parseResult = boxValidators.listBoxesQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListBoxesUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminGetBox(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box id required' });
    try {
      const result = await adminGetBoxUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateBox(req: Request, res: Response) {
    const parseResult = boxValidators.createBox.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateBoxUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
    }
  }

  async adminCreateBoxWithUpload(req: Request, res: Response) {
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) {
      return res.status(400).json({ error: 'Image file is required (field: image)' });
    }

    // Parse form-data fields. Multer puts them in req.body as strings.
    const parseResult = boxValidators.createBox.safeParse({
      name: req.body?.name,
      description: req.body?.description ?? null,
      isActive:
        typeof req.body?.isActive === 'string'
          ? req.body.isActive === 'true'
          : req.body?.isActive,
      imageUrl: null,
    });
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const ext = getImageExtension(file.mimetype);
      const key = `boxes/${Date.now()}-${randomUUID()}${ext}`;
      const imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
      const result = await adminCreateBoxUseCase.execute({ ...parseResult.data, imageUrl });
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpdateBox(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box id required' });
    const parseResult = boxValidators.updateBox.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateBoxUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpdateBoxWithUpload(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box id required' });

    const file = (req as Request & { file?: Express.Multer.File }).file;

    // Parse form-data fields. Multer puts them in req.body as strings.
    const parseResult = boxValidators.updateBox.safeParse({
      name: req.body?.name,
      description: req.body?.description,
      isActive:
        typeof req.body?.isActive === 'string'
          ? req.body.isActive === 'true'
          : req.body?.isActive,
      // imageUrl comes from uploaded file (if present), so don't accept it from the form body here.
    });
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      let imageUrl: string | undefined;
      if (file) {
        const ext = getImageExtension(file.mimetype);
        const key = `boxes/${id}/${Date.now()}-${randomUUID()}${ext}`;
        imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
      }

      const result = await adminUpdateBoxUseCase.execute(id, {
        ...parseResult.data,
        ...(imageUrl !== undefined && { imageUrl }),
      });
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminDeleteBox(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box id required' });
    try {
      await adminDeleteBoxUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminListBoxVersions(req: Request, res: Response) {
    const parseResult = boxValidators.listBoxVersionsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListBoxVersionsUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async adminGetBoxVersion(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box version id required' });
    try {
      const result = await adminGetBoxVersionUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateBoxVersion(req: Request, res: Response) {
    const parseResult = boxValidators.createBoxVersion.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateBoxVersionUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpdateBoxVersion(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box version id required' });
    const parseResult = boxValidators.updateBoxVersion.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateBoxVersionUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminDeleteBoxVersion(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box version id required' });
    try {
      await adminDeleteBoxVersionUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminListBoxVersionItems(req: Request, res: Response) {
    const versionId = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!versionId) return res.status(400).json({ error: 'Box version id required' });
    try {
      const result = await adminListBoxItemsUseCase.execute(versionId);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async adminGetBoxItem(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box item id required' });
    try {
      const result = await adminGetBoxItemUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateBoxItem(req: Request, res: Response) {
    const parseResult = boxValidators.createBoxItem.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateBoxItemUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found') || message.includes('does not belong')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminUpdateBoxItem(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box item id required' });
    const parseResult = boxValidators.updateBoxItem.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateBoxItemUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminDeleteBoxItem(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box item id required' });
    try {
      await adminDeleteBoxItemUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async publicListBoxes(req: Request, res: Response) {
    const parseResult = boxValidators.listBoxesQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListBoxesUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async publicGetBox(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box id required' });
    try {
      const result = await adminGetBoxUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async publicListBoxVersions(req: Request, res: Response) {
    const parseResult = boxValidators.listBoxVersionsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListBoxVersionsUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async publicGetBoxVersion(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Box version id required' });
    try {
      const result = await adminGetBoxVersionUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async publicListBoxVersionItems(req: Request, res: Response) {
    const versionId = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!versionId) return res.status(400).json({ error: 'Box version id required' });
    try {
      const result = await adminListBoxItemsUseCase.execute(versionId);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }
}
