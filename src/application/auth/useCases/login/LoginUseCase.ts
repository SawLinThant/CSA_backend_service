import type { UserRepository } from '../../../../domain/users/UserRepository';
import type { UserRole } from '../../../../domain/users/User';
import type { LoginInput } from '../../dtos/authDtos';
import { passwordHasher } from '../../../../core/security/passwordHasher';
import { issueRefreshToken, signAccessToken } from '../../../../core/security/jwt';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginInput, expectedRole: UserRole) {
    const user = await this.userRepository.findByPhone(input.phone);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.role !== expectedRole) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }

    const valid = await passwordHasher.verify(user.passwordHash, input.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const { refreshToken } = issueRefreshToken({ sub: user.id, role: user.role });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
