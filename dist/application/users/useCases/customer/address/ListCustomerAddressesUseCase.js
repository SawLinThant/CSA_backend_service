"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomerAddressesUseCase = void 0;
class ListCustomerAddressesUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(userId) {
        return this.addressRepository.listByUserId(userId);
    }
}
exports.ListCustomerAddressesUseCase = ListCustomerAddressesUseCase;
//# sourceMappingURL=ListCustomerAddressesUseCase.js.map