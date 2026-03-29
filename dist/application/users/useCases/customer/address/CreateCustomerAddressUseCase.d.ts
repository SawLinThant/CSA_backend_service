import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
import type { CreateAddressInput } from '../../../dtos/addressDtos';
export declare class CreateCustomerAddressUseCase {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    execute(userId: string, input: CreateAddressInput): Promise<import("../../../../../domain/addresses/Address").Address>;
}
//# sourceMappingURL=CreateCustomerAddressUseCase.d.ts.map