import {
  updateCustomerProfileSchema,
  updateFarmerProfileSchema,
  adminCreateCustomerSchema,
  adminUpdateCustomerSchema,
  listCustomersQuerySchema,
  listFarmersQuerySchema,
} from '../../../application/users/dtos/userDtos';

export const userValidators = {
  updateCustomerProfile: updateCustomerProfileSchema,
  updateFarmerProfile: updateFarmerProfileSchema,
  adminCreateCustomer: adminCreateCustomerSchema,
  adminUpdateCustomer: adminUpdateCustomerSchema,
  listCustomersQuery: listCustomersQuerySchema,
  listFarmersQuery: listFarmersQuerySchema,
};
