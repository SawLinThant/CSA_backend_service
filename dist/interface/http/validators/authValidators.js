"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidators = void 0;
const authDtos_1 = require("../../../application/auth/dtos/authDtos");
exports.authValidators = {
    registerCustomer: authDtos_1.registerCustomerSchema,
    registerFarmer: authDtos_1.registerFarmerSchema,
    login: authDtos_1.loginSchema,
    refreshToken: authDtos_1.refreshTokenSchema,
    sendOtp: authDtos_1.sendOtpSchema,
};
//# sourceMappingURL=authValidators.js.map