import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';

export class GetCustomerAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string) {
    const address = await this.addressRepository.findByIdAndUserId(addressId, userId);
    if (!address) throw new Error('Address not found');
    return address;
  }
}
