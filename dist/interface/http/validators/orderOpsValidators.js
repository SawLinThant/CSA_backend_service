"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderOpsValidators = void 0;
const orderOpsDtos_1 = require("../../../application/orders/dtos/orderOpsDtos");
exports.orderOpsValidators = {
    summaryQuery: orderOpsDtos_1.adminSubscriptionOrderOpsSummaryQuerySchema,
    listCycleEventsQuery: orderOpsDtos_1.adminListSubscriptionOrderCycleEventsQuerySchema,
};
//# sourceMappingURL=orderOpsValidators.js.map