import type { UserRepository } from '../../../../../domain/users/UserRepository';

export class GetCustomerProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'customer') throw new Error('Forbidden');

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }
}
