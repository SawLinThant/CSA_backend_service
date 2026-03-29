"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerAddressUseCase = void 0;
class DeleteCustomerAddressUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(userId, addressId) {
        await this.addressRepository.deleteForUser(addressId, userId);
    }
}
exports.DeleteCustomerAddressUseCase = DeleteCustomerAddressUseCase;
//# sourceMappingURL=DeleteCustomerAddressUseCase.js.map