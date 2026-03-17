import type { UserRepository } from '../../../../../domain/users/UserRepository';

export class AdminToggleUserStatusUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(targetUserId: string, actorAdminUserId: string) {
    if (targetUserId === actorAdminUserId) {
      throw new Error('You cannot change your own status');
    }

    const user = await this.userRepository.findById(targetUserId);
    if (!user) throw new Error('User not found');

    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    return this.userRepository.update(targetUserId, { status: nextStatus });
  }
}

