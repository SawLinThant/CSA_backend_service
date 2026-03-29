import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';

export class ListCustomerAddressesUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string) {
    return this.addressRepository.listByUserId(userId);
  }
}
