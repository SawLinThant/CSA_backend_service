import { listCustomerOrdersQuerySchema } from '../../../application/orders/dtos/customerOrderDtos';
import {
  adminUpdateOrderStatusSchema,
  adminUpsertDeliverySchema,
} from '../../../application/orders/dtos/adminOrderDtos';

export const orderValidators = {
  listCustomerOrdersQuery: listCustomerOrdersQuerySchema,
  adminUpdateOrderStatus: adminUpdateOrderStatusSchema,
  adminUpsertDelivery: adminUpsertDeliverySchema,
};
