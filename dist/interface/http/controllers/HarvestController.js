"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestController = void 0;
const PrismaFarmerRepository_1 = require("../../../infrastructure/db/repositories/PrismaFarmerRepository");
const PrismaProductRepository_1 = require("../../../infrastructure/db/repositories/PrismaProductRepository");
const PrismaHarvestRepository_1 = require("../../../infrastructure/db/repositories/PrismaHarvestRepository");
const FarmerCreateHarvestUseCase_1 = require("../../../application/harvests/useCases/farmer/FarmerCreateHarvestUseCase");
const FarmerListMyHarvestsUseCase_1 = require("../../../application/harvests/useCases/farmer/FarmerListMyHarvestsUseCase");
const FarmerGetHarvestUseCase_1 = require("../../../application/harvests/useCases/farmer/FarmerGetHarvestUseCase");
const FarmerUpdateHarvestUseCase_1 = require("../../../application/harvests/useCases/farmer/FarmerUpdateHarvestUseCase");
const AdminListHarvestsUseCase_1 = require("../../../application/harvests/useCases/admin/AdminListHarvestsUseCase");
const AdminGetHarvestUseCase_1 = require("../../../application/harvests/useCases/admin/AdminGetHarvestUseCase");
const AdminApproveHarvestUseCase_1 = require("../../../application/harvests/useCases/admin/AdminApproveHarvestUseCase");
const AdminRejectHarvestUseCase_1 = require("../../../application/harvests/useCases/admin/AdminRejectHarvestUseCase");
const harvestValidators_1 = require("../validators/harvestValidators");
const farmerRepository = new PrismaFarmerRepository_1.PrismaFarmerRepository();
const productRepository = new PrismaProductRepository_1.PrismaProductRepository();
const harvestRepository = new PrismaHarvestRepository_1.PrismaHarvestRepository();
const farmerCreateHarvestUseCase = new FarmerCreateHarvestUseCase_1.FarmerCreateHarvestUseCase(farmerRepository, productRepository, harvestRepository);
const farmerListMyHarvestsUseCase = new FarmerListMyHarvestsUseCase_1.FarmerListMyHarvestsUseCase(farmerRepository, harvestRepository);
const farmerGetHarvestUseCase = new FarmerGetHarvestUseCase_1.FarmerGetHarvestUseCase(farmerRepository, harvestRepository);
const farmerUpdateHarvestUseCase = new FarmerUpdateHarvestUseCase_1.FarmerUpdateHarvestUseCase(farmerRepository, harvestRepository);
const adminListHarvestsUseCase = new AdminListHarvestsUseCase_1.AdminListHarvestsUseCase(harvestRepository);
const adminGetHarvestUseCase = new AdminGetHarvestUseCase_1.AdminGetHarvestUseCase(harvestRepository);
const adminApproveHarvestUseCase = new AdminApproveHarvestUseCase_1.AdminApproveHarvestUseCase(harvestRepository);
const adminRejectHarvestUseCase = new AdminRejectHarvestUseCase_1.AdminRejectHarvestUseCase(harvestRepository);
class HarvestController {
    async farmerListMyHarvests(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = harvestValidators_1.harvestValidators.listMyHarvestsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await farmerListMyHarvestsUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(500).json({ error: message });
        }
    }
    async farmerGetHarvest(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Harvest id required' });
        try {
            const result = await farmerGetHarvestUseCase.execute(req.user.id, id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            return res.status(404).json({ error: message });
        }
    }
    async farmerCreateHarvest(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = harvestValidators_1.harvestValidators.createHarvest.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await farmerCreateHarvestUseCase.execute(req.user.id, parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Create failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async farmerUpdateHarvest(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Harvest id required' });
        const parseResult = harvestValidators_1.harvestValidators.updateHarvest.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await farmerUpdateHarvestUseCase.execute(req.user.id, id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('Only pending'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminListHarvests(req, res) {
        const parseResult = harvestValidators_1.harvestValidators.listHarvestsQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListHarvestsUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminGetHarvest(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Harvest id required' });
        try {
            const result = await adminGetHarvestUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Not found';
            return res.status(404).json({ error: message });
        }
    }
    async adminApproveHarvest(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Harvest id required' });
        try {
            const result = await adminApproveHarvestUseCase.execute(id, req.user.id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('Only pending'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async adminRejectHarvest(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Harvest id required' });
        try {
            const result = await adminRejectHarvestUseCase.execute(id, req.user.id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            if (message.includes('Only pending'))
                return res.status(400).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
}
exports.HarvestController = HarvestController;
//# sourceMappingURL=HarvestController.js.map