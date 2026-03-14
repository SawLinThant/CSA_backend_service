import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { AdminUpdateCustomerInput } from '../../../dtos/userDtos';

export class AdminUpdateCustomerUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(customerId: string, input: AdminUpdateCustomerInput) {
    const customerWithUser = await this.customerRepository.getByIdWithUser(customerId);
    if (!customerWithUser) throw new Error('Customer not found');

    const userId = customerWithUser.userId;

    if (input.phone !== undefined) {
      const existing = await this.userRepository.findByPhone(input.phone);
      if (existing && existing.id !== userId) throw new Error('Phone already in use');
    }
    if (input.email !== undefined && input.email !== null) {
      const existing = await this.userRepository.findByEmail(input.email);
      if (existing && existing.id !== userId) throw new Error('Email already in use');
    }

    await this.userRepository.update(userId, {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.email !== undefined && { email: input.email }),
      ...(input.status !== undefined && { status: input.status }),
    });

    const updated = await this.customerRepository.getByIdWithUser(customerId);
    if (!updated) throw new Error('Customer not found');

    return {
      id: updated.id,
      userId: updated.userId,
      createdAt: updated.createdAt,
      user: {
        id: updated.user.id,
        name: updated.user.name,
        email: updated.user.email,
        phone: updated.user.phone,
        role: updated.user.role,
        status: updated.user.status,
      },
    };
  }
}
