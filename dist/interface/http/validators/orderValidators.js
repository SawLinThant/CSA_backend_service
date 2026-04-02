"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidators = void 0;
const customerOrderDtos_1 = require("../../../application/orders/dtos/customerOrderDtos");
const adminOrderDtos_1 = require("../../../application/orders/dtos/adminOrderDtos");
exports.orderValidators = {
    listCustomerOrdersQuery: customerOrderDtos_1.listCustomerOrdersQuerySchema,
    adminUpdateOrderStatus: adminOrderDtos_1.adminUpdateOrderStatusSchema,
    adminUpsertDelivery: adminOrderDtos_1.adminUpsertDeliverySchema,
};
//# sourceMappingURL=orderValidators.js.map