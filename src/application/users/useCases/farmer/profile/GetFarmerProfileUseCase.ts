import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { FarmerRepository } from '../../../../../domain/farmers/FarmerRepository';

export class GetFarmerProfileUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly farmerRepository: FarmerRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'farmer') throw new Error('Forbidden');

    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        imageUrl: user.imageUrl,
        role: user.role,
      },
      farmer: {
        id: farmer.id,
        farmName: farmer.farmName,
        farmLocation: farmer.farmLocation,
        farmDescription: farmer.farmDescription,
        approved: farmer.approved,
      },
    };
  }
}
