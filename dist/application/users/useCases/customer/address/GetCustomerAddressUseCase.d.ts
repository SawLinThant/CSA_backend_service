import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
export declare class GetCustomerAddressUseCase {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    execute(userId: string, addressId: string): Promise<import("../../../../../domain/addresses/Address").Address>;
}
//# sourceMappingURL=GetCustomerAddressUseCase.d.ts.map