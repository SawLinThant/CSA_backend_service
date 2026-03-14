import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { RegisterFarmerInput } from '../../dtos/authDtos';
import { passwordHasher } from '../../../../core/security/passwordHasher';
import { signAccessToken, signRefreshToken } from '../../../../core/security/jwt';
import prisma from '../../../../infrastructure/db/prismaClient';

export class RegisterFarmerUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterFarmerInput) {
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
          role: 'farmer',
          status: 'active',
        },
      });

      const farmer = await tx.farmer.create({
        data: {
          userId: user.id,
          farmName: input.farmName,
          farmLocation: input.farmLocation,
          farmDescription: input.farmDescription ?? null,
          approved: false,
        },
      });

      return { user, farmer };
    });

    const accessToken = signAccessToken({ sub: result.user.id, role: 'farmer' });
    const refreshToken = signRefreshToken({ sub: result.user.id, role: 'farmer', type: 'refresh' });

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
