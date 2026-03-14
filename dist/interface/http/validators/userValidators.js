"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const userDtos_1 = require("../../../application/users/dtos/userDtos");
exports.userValidators = {
    updateCustomerProfile: userDtos_1.updateCustomerProfileSchema,
    updateFarmerProfile: userDtos_1.updateFarmerProfileSchema,
    adminCreateCustomer: userDtos_1.adminCreateCustomerSchema,
    adminUpdateCustomer: userDtos_1.adminUpdateCustomerSchema,
    listCustomersQuery: userDtos_1.listCustomersQuerySchema,
};
//# sourceMappingURL=userValidators.js.map