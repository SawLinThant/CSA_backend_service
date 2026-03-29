"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerAddressUseCase = void 0;
class UpdateCustomerAddressUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(userId, addressId, input) {
        return this.addressRepository.updateForUser(addressId, userId, {
            ...(input.addressLine !== undefined && { addressLine: input.addressLine }),
            ...(input.city !== undefined && { city: input.city }),
            ...(input.state !== undefined && { state: input.state }),
            ...(input.postalCode !== undefined && { postalCode: input.postalCode }),
            ...(input.country !== undefined && { country: input.country }),
            ...(input.isDefault !== undefined && { isDefault: input.isDefault }),
        });
    }
}
exports.UpdateCustomerAddressUseCase = UpdateCustomerAddressUseCase;
//# sourceMappingURL=UpdateCustomerAddressUseCase.js.map