"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionPlanValidators = void 0;
const subscriptionPlanDtos_1 = require("../../../application/subscriptionPlans/dtos/subscriptionPlanDtos");
exports.subscriptionPlanValidators = {
    createSubscriptionPlan: subscriptionPlanDtos_1.createSubscriptionPlanSchema,
    updateSubscriptionPlan: subscriptionPlanDtos_1.updateSubscriptionPlanSchema,
    listSubscriptionPlansQuery: subscriptionPlanDtos_1.listSubscriptionPlansQuerySchema,
};
//# sourceMappingURL=subscriptionPlanValidators.js.map