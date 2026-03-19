"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBoxVersionsQuerySchema = exports.updateBoxVersionSchema = exports.createBoxVersionSchema = void 0;
const zod_1 = require("zod");
exports.createBoxVersionSchema = zod_1.z
    .object({
    boxId: zod_1.z.string().min(1),
    versionName: zod_1.z.string().min(1),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().optional().nullable(),
})
    .refine((data) => {
    if (data.endDate != null)
        return data.endDate >= data.startDate;
    return true;
}, { message: 'endDate must be on or after startDate', path: ['endDate'] });
exports.updateBoxVersionSchema = zod_1.z
    .object({
    versionName: zod_1.z.string().min(1).optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional().nullable(),
})
    .refine((data) => {
    if (data.startDate !== undefined && data.endDate != null)
        return data.endDate >= data.startDate;
    return true;
}, { message: 'endDate must be on or after startDate', path: ['endDate'] });
exports.listBoxVersionsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    boxId: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=boxVersionDtos.js.map