import type { Request, Response } from 'express';
import { PrismaFarmerRepository } from '../../../infrastructure/db/repositories/PrismaFarmerRepository';
import { PrismaProductRepository } from '../../../infrastructure/db/repositories/PrismaProductRepository';
import { PrismaHarvestRepository } from '../../../infrastructure/db/repositories/PrismaHarvestRepository';
import { PrismaUserRepository } from '../../../infrastructure/db/repositories/PrismaUserRepository';
import { FarmerCreateHarvestUseCase } from '../../../application/harvests/useCases/farmer/FarmerCreateHarvestUseCase';
import { FarmerListMyHarvestsUseCase } from '../../../application/harvests/useCases/farmer/FarmerListMyHarvestsUseCase';
import { FarmerGetHarvestUseCase } from '../../../application/harvests/useCases/farmer/FarmerGetHarvestUseCase';
import { FarmerUpdateHarvestUseCase } from '../../../application/harvests/useCases/farmer/FarmerUpdateHarvestUseCase';
import { AdminListHarvestsUseCase } from '../../../application/harvests/useCases/admin/AdminListHarvestsUseCase';
import { AdminGetHarvestUseCase } from '../../../application/harvests/useCases/admin/AdminGetHarvestUseCase';
import { AdminApproveHarvestUseCase } from '../../../application/harvests/useCases/admin/AdminApproveHarvestUseCase';
import { AdminRejectHarvestUseCase } from '../../../application/harvests/useCases/admin/AdminRejectHarvestUseCase';
import { harvestValidators } from '../validators/harvestValidators';

const farmerRepository = new PrismaFarmerRepository();
const productRepository = new PrismaProductRepository();
const harvestRepository = new PrismaHarvestRepository();
const userRepository = new PrismaUserRepository();

const farmerCreateHarvestUseCase = new FarmerCreateHarvestUseCase(
  farmerRepository,
  productRepository,
  harvestRepository,
);
const farmerListMyHarvestsUseCase = new FarmerListMyHarvestsUseCase(farmerRepository, harvestRepository);
const farmerGetHarvestUseCase = new FarmerGetHarvestUseCase(farmerRepository, harvestRepository);
const farmerUpdateHarvestUseCase = new FarmerUpdateHarvestUseCase(farmerRepository, harvestRepository);
const adminListHarvestsUseCase = new AdminListHarvestsUseCase(
  harvestRepository,
  farmerRepository,
  productRepository,
  userRepository,
);
const adminGetHarvestUseCase = new AdminGetHarvestUseCase(harvestRepository);
const adminApproveHarvestUseCase = new AdminApproveHarvestUseCase(harvestRepository);
const adminRejectHarvestUseCase = new AdminRejectHarvestUseCase(harvestRepository);

export class HarvestController {
  async farmerListMyHarvests(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = harvestValidators.listMyHarvestsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await farmerListMyHarvestsUseCase.execute(req.user.id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(500).json({ error: message });
    }
  }

  async farmerGetHarvest(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Harvest id required' });
    try {
      const result = await farmerGetHarvestUseCase.execute(req.user.id, id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      return res.status(404).json({ error: message });
    }
  }

  async farmerCreateHarvest(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = harvestValidators.createHarvest.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await farmerCreateHarvestUseCase.execute(req.user.id, parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Create failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async farmerUpdateHarvest(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Harvest id required' });
    const parseResult = harvestValidators.updateHarvest.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await farmerUpdateHarvestUseCase.execute(req.user.id, id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('Only pending')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminListHarvests(req: Request, res: Response) {
    const parseResult = harvestValidators.listHarvestsQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListHarvestsUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminGetHarvest(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Harvest id required' });
    try {
      const result = await adminGetHarvestUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Not found';
      return res.status(404).json({ error: message });
    }
  }

  async adminApproveHarvest(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Harvest id required' });
    try {
      const result = await adminApproveHarvestUseCase.execute(id, req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('Only pending')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminRejectHarvest(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Harvest id required' });
    try {
      const result = await adminRejectHarvestUseCase.execute(id, req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      if (message.includes('Only pending')) return res.status(400).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }
}
