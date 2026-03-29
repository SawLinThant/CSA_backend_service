import type { AddressRepository } from '../../../../../domain/addresses/AddressRepository';
import type { CreateAddressInput } from '../../../dtos/addressDtos';

export class CreateCustomerAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, input: CreateAddressInput) {
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
