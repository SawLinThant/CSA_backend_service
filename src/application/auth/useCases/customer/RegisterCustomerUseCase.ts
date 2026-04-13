import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { RegisterCustomerInput } from '../../dtos/authDtos';
import { passwordHasher } from '../../../../core/security/passwordHasher';
import { issueRefreshToken, signAccessToken } from '../../../../core/security/jwt';
import prisma from '../../../../infrastructure/db/prismaClient';

export class RegisterCustomerUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterCustomerInput) {
    const existingByPhone = await this.userRepository.findByPhone(input.phone);
    if (existingByPhone) {
      throw new Error('Phone already in use');
    }

    if (input.email) {
      const existingByEmail = await this.userRepository.findByEmail(input.email);
      if (existingByEmail) {
        throw new Error('Email already in use');
      }
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
        data: {
          userId: user.id,
        },
      });

      return { user, customer };
    });

    const accessToken = signAccessToken({ sub: result.user.id, role: 'customer' });
    const { refreshToken } = issueRefreshToken({ sub: result.user.id, role: 'customer' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    };
  }
}
