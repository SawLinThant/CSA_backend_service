import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
import type { UpdateAddressInput } from '../../../dtos/addressDtos';
export declare class UpdateCustomerAddressUseCase {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    execute(userId: string, addressId: string, input: UpdateAddressInput): Promise<import("../../../../../domain/addresses/Address").Address>;
}
//# sourceMappingURL=UpdateCustomerAddressUseCase.d.ts.map