import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { AdminCreateCustomerInput } from '../../../dtos/userDtos';
import { passwordHasher } from '../../../../../core/security/passwordHasher';
import prisma from '../../../../../infrastructure/db/prismaClient';

export class AdminCreateCustomerUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: AdminCreateCustomerInput) {
    const existingPhone = await this.userRepository.findByPhone(input.phone);
    if (existingPhone) throw new Error('Phone already in use');
    if (input.email) {
      const existingEmail = await this.userRepository.findByEmail(input.email);
      if (existingEmail) throw new Error('Email already in use');
    }

    const passwordHash = await passwordHasher.hash(input.password);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: input.name,
          email: input.email ?? null,
          phone: input.phone,
          password: passwordHash,
          role: 'customer',
          status: 'active',
        },
      });
      const customer = await tx.customer.create({
        data: { userId: user.id },
      });
      return { user, customer };
    });

    return {
      id: result.customer.id,
      userId: result.user.id,
      createdAt: result.customer.createdAt,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        role: result.user.role,
        status: result.user.status,
      },
    };
  }
}
