"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const userDtos_1 = require("../../../application/users/dtos/userDtos");
const addressDtos_1 = require("../../../application/users/dtos/addressDtos");
exports.userValidators = {
    updateCustomerProfile: userDtos_1.updateCustomerProfileSchema,
    updateFarmerProfile: userDtos_1.updateFarmerProfileSchema,
    adminCreateCustomer: userDtos_1.adminCreateCustomerSchema,
    adminUpdateCustomer: userDtos_1.adminUpdateCustomerSchema,
    listCustomersQuery: userDtos_1.listCustomersQuerySchema,
    listFarmersQuery: userDtos_1.listFarmersQuerySchema,
    createAddress: addressDtos_1.createAddressSchema,
    updateAddress: addressDtos_1.updateAddressSchema,
};
//# sourceMappingURL=userValidators.js.map