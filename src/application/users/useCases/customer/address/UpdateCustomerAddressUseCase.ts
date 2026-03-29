import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
import type { UpdateAddressInput } from '../../../dtos/addressDtos';

export class UpdateCustomerAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string, input: UpdateAddressInput) {
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
