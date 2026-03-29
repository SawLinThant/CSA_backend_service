import {
  adminListSubscriptionOrderCycleEventsQuerySchema,
  adminSubscriptionOrderOpsSummaryQuerySchema,
} from '../../../application/orders/dtos/orderOpsDtos';

export const orderOpsValidators = {
  summaryQuery: adminSubscriptionOrderOpsSummaryQuerySchema,
  listCycleEventsQuery: adminListSubscriptionOrderCycleEventsQuerySchema,
};

