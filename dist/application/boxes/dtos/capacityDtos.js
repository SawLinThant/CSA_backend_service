"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInventoryReservationsQuerySchema = exports.updateCapacitySnapshotStatusSchema = exports.listCapacitySnapshotsQuerySchema = exports.recomputeBoxVersionCapacitySchema = void 0;
const zod_1 = require("zod");
exports.recomputeBoxVersionCapacitySchema = zod_1.z.object({
    cycleDate: zod_1.z.coerce.date(),
});
exports.listCapacitySnapshotsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(200).default(20),
    boxVersionId: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['open', 'locked', 'closed']).optional(),
    cycleDateFrom: zod_1.z.coerce.date().optional(),
    cycleDateTo: zod_1.z.coerce.date().optional(),
});
exports.updateCapacitySnapshotStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['open', 'locked', 'closed']),
});
exports.listInventoryReservationsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(200).default(20),
    status: zod_1.z.enum(['reserved', 'consumed', 'released', 'expired']).optional(),
    cycleDateFrom: zod_1.z.coerce.date().optional(),
    cycleDateTo: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=capacityDtos.js.map