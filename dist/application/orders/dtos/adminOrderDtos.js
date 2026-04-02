"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpsertDeliverySchema = exports.adminUpdateOrderStatusSchema = exports.deliveryStatusEnum = exports.orderStatusEnum = void 0;
const zod_1 = require("zod");
exports.orderStatusEnum = zod_1.z.enum(['pending', 'packed', 'shipped', 'delivered', 'cancelled']);
exports.deliveryStatusEnum = zod_1.z.enum(['scheduled', 'out_for_delivery', 'delivered', 'failed']);
exports.adminUpdateOrderStatusSchema = zod_1.z.object({
    status: exports.orderStatusEnum,
});
exports.adminUpsertDeliverySchema = zod_1.z
    .object({
    deliveryStatus: exports.deliveryStatusEnum,
    deliveryDriver: zod_1.z.string().trim().min(1).optional().nullable(),
    trackingCode: zod_1.z.string().trim().min(1).optional().nullable(),
    deliveredAt: zod_1.z.coerce.date().optional().nullable(),
})
    .superRefine((val, ctx) => {
    if (val.deliveryStatus === 'delivered' && !val.deliveredAt) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['deliveredAt'],
            message: 'deliveredAt is required when deliveryStatus is delivered',
        });
    }
});
//# sourceMappingURL=adminOrderDtos.js.map