"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddressUseCase = void 0;
class GetCustomerAddressUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(userId, addressId) {
        const address = await this.addressRepository.findByIdAndUserId(addressId, userId);
        if (!address)
            throw new Error('Address not found');
        return address;
    }
}
exports.GetCustomerAddressUseCase = GetCustomerAddressUseCase;
//# sourceMappingURL=GetCustomerAddressUseCase.js.map