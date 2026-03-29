import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
export declare class DeleteCustomerAddressUseCase {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    execute(userId: string, addressId: string): Promise<void>;
}
//# sourceMappingURL=DeleteCustomerAddressUseCase.d.ts.map