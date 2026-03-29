"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCustomerOrdersQuerySchema = void 0;
const zod_1 = require("zod");
const orderStatusEnum = zod_1.z.enum(['pending', 'packed', 'shipped', 'delivered', 'cancelled']);
exports.listCustomerOrdersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    status: orderStatusEnum.optional(),
    /** Comma-separated statuses, e.g. `pending,packed,shipped`. If set, overrides `status`. */
    statuses: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    from: zod_1.z.coerce.date().optional(),
    to: zod_1.z.coerce.date().optional(),
    sortBy: zod_1.z.enum(['createdAt', 'totalPrice']).default('createdAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
//# sourceMappingURL=customerOrderDtos.js.map