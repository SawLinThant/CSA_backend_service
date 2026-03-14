import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { UpdateCustomerProfileInput } from '../../../dtos/userDtos';

export class UpdateCustomerProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, input: UpdateCustomerProfileInput) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'customer') throw new Error('Forbidden');

    if (input.phone !== undefined) {
      const existing = await this.userRepository.findByPhone(input.phone);
      if (existing && existing.id !== userId) throw new Error('Phone already in use');
    }
    if (input.email !== undefined && input.email !== null) {
      const existing = await this.userRepository.findByEmail(input.email);
      if (existing && existing.id !== userId) throw new Error('Email already in use');
    }

    const updated = await this.userRepository.update(userId, {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.email !== undefined && { email: input.email }),
    });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      role: updated.role,
    };
  }
}
