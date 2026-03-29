import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { FarmerRepository } from '../../../../../domain/farmers/FarmerRepository';
import type { UpdateFarmerProfileInput } from '../../../dtos/userDtos';

export class UpdateFarmerProfileUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly farmerRepository: FarmerRepository,
  ) {}

  async execute(userId: string, input: UpdateFarmerProfileInput) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'farmer') throw new Error('Forbidden');

    const farmer = await this.farmerRepository.findByUserId(userId);
    if (!farmer) throw new Error('Farmer profile not found');

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
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
    });

    const updatedFarmer = await this.farmerRepository.update(farmer.id, {
      ...(input.farmName !== undefined && { farmName: input.farmName }),
      ...(input.farmLocation !== undefined && { farmLocation: input.farmLocation }),
      ...(input.farmDescription !== undefined && { farmDescription: input.farmDescription }),
    });

    const updatedUser = await this.userRepository.findById(userId);
    if (!updatedUser) throw new Error('User not found');

    return {
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        imageUrl: updatedUser.imageUrl,
        role: updatedUser.role,
      },
      farmer: {
        id: updatedFarmer.id,
        farmName: updatedFarmer.farmName,
        farmLocation: updatedFarmer.farmLocation,
        farmDescription: updatedFarmer.farmDescription,
        approved: updatedFarmer.approved,
      },
    };
  }
}
