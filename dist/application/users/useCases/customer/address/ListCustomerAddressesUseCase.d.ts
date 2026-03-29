import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
export declare class ListCustomerAddressesUseCase {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    execute(userId: string): Promise<import("../../../../../domain/addresses/Address").Address[]>;
}
//# sourceMappingURL=ListCustomerAddressesUseCase.d.ts.map