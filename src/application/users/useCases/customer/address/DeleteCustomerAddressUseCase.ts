import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';

export class DeleteCustomerAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string) {
    await this.addressRepository.deleteForUser(addressId, userId);
  }
}
