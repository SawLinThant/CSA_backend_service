import {
  updateCustomerProfileSchema,
  updateFarmerProfileSchema,
  adminCreateCustomerSchema,
  adminUpdateCustomerSchema,
  listCustomersQuerySchema,
  listFarmersQuerySchema,
} from '../../../application/users/dtos/userDtos';
import { createAddressSchema, updateAddressSchema } from '../../../application/users/dtos/addressDtos';

export const userValidators = {
  updateCustomerProfile: updateCustomerProfileSchema,
  updateFarmerProfile: updateFarmerProfileSchema,
  adminCreateCustomer: adminCreateCustomerSchema,
  adminUpdateCustomer: adminUpdateCustomerSchema,
  listCustomersQuery: listCustomersQuerySchema,
  listFarmersQuery: listFarmersQuerySchema,
  createAddress: createAddressSchema,
  updateAddress: updateAddressSchema,
};
