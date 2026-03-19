"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionValidators = void 0;
const subscriptionDtos_1 = require("../../../application/subscriptions/dtos/subscriptionDtos");
exports.subscriptionValidators = {
    createSubscription: subscriptionDtos_1.createSubscriptionSchema,
    listMySubscriptionsQuery: subscriptionDtos_1.listMySubscriptionsQuerySchema,
    pauseSubscription: subscriptionDtos_1.pauseSubscriptionSchema,
};
//# sourceMappingURL=subscriptionValidators.js.map