"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHarvestsQuerySchema = exports.listMyHarvestsQuerySchema = exports.updateHarvestSchema = exports.createHarvestSchema = void 0;
const zod_1 = require("zod");
exports.createHarvestSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    quantityAvailable: zod_1.z.number().int().positive(),
    unitPrice: zod_1.z.number().positive(),
    harvestDate: zod_1.z.coerce.date(),
    availableUntil: zod_1.z.coerce.date(),
}).refine((data) => data.availableUntil >= data.harvestDate, {
    message: 'availableUntil must be on or after harvestDate',
    path: ['availableUntil'],
});
exports.updateHarvestSchema = zod_1.z.object({
    quantityAvailable: zod_1.z.number().int().positive().optional(),
    unitPrice: zod_1.z.number().positive().optional(),
    harvestDate: zod_1.z.coerce.date().optional(),
    availableUntil: zod_1.z.coerce.date().optional(),
}).refine((data) => {
    if (data.harvestDate !== undefined && data.availableUntil !== undefined) {
        return data.availableUntil >= data.harvestDate;
    }
    return true;
}, { message: 'availableUntil must be on or after harvestDate', path: ['availableUntil'] });
exports.listMyHarvestsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    productId: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['pending', 'approved', 'rejected']).optional(),
    harvestDateFrom: zod_1.z.coerce.date().optional(),
    harvestDateTo: zod_1.z.coerce.date().optional(),
}).refine((data) => {
    if (data.harvestDateFrom && data.harvestDateTo) {
        return data.harvestDateTo >= data.harvestDateFrom;
    }
    return true;
}, { message: 'harvestDateTo must be on or after harvestDateFrom', path: ['harvestDateTo'] });
exports.listHarvestsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    farmerId: zod_1.z.string().min(1).optional(),
    productId: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['pending', 'approved', 'rejected']).optional(),
    harvestDateFrom: zod_1.z.coerce.date().optional(),
    harvestDateTo: zod_1.z.coerce.date().optional(),
}).refine((data) => {
    if (data.harvestDateFrom && data.harvestDateTo) {
        return data.harvestDateTo >= data.harvestDateFrom;
    }
    return true;
}, { message: 'harvestDateTo must be on or after harvestDateFrom', path: ['harvestDateTo'] });
//# sourceMappingURL=harvestDtos.js.map