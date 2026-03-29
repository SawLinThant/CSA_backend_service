import {
  registerCustomerSchema,
  registerFarmerSchema,
  loginSchema,
  refreshTokenSchema,
  sendOtpSchema,
} from '../../../application/auth/dtos/authDtos';

export const authValidators = {
  registerCustomer: registerCustomerSchema,
  registerFarmer: registerFarmerSchema,
  login: loginSchema,
  refreshToken: refreshTokenSchema,
  sendOtp: sendOtpSchema,
};

