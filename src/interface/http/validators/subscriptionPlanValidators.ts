import {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
  listSubscriptionPlansQuerySchema,
} from '../../../application/subscriptionPlans/dtos/subscriptionPlanDtos';

export const subscriptionPlanValidators = {
  createSubscriptionPlan: createSubscriptionPlanSchema,
  updateSubscriptionPlan: updateSubscriptionPlanSchema,
  listSubscriptionPlansQuery: listSubscriptionPlansQuerySchema,
};
