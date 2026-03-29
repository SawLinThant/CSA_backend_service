"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerAddressUseCase = void 0;
class CreateCustomerAddressUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(userId, input) {
        return this.addressRepository.createForUser(userId, {
            addressLine: input.addressLine,
            city: input.city,
            state: input.state,
            postalCode: input.postalCode,
            country: input.country,
            ...(input.isDefault !== undefined && { isDefault: input.isDefault }),
        });
    }
}
exports.CreateCustomerAddressUseCase = CreateCustomerAddressUseCase;
//# sourceMappingURL=CreateCustomerAddressUseCase.js.map