"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmerProfileUseCase = void 0;
class UpdateFarmerProfileUseCase {
    constructor(userRepository, farmerRepository) {
        this.userRepository = userRepository;
        this.farmerRepository = farmerRepository;
    }
    async execute(userId, input) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        if (user.role !== 'farmer')
            throw new Error('Forbidden');
        const farmer = await this.farmerRepository.findByUserId(userId);
        if (!farmer)
            throw new Error('Farmer profile not found');
        if (input.phone !== undefined) {
            const existing = await this.userRepository.findByPhone(input.phone);
            if (existing && existing.id !== userId)
                throw new Error('Phone already in use');
        }
        if (input.email !== undefined && input.email !== null) {
            const existing = await this.userRepository.findByEmail(input.email);
            if (existing && existing.id !== userId)
                throw new Error('Email already in use');
        }
        await this.userRepository.update(userId, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.phone !== undefined && { phone: input.phone }),
            ...(input.email !== undefined && { email: input.email }),
        });
        const updatedFarmer = await this.farmerRepository.update(farmer.id, {
            ...(input.farmName !== undefined && { farmName: input.farmName }),
            ...(input.farmLocation !== undefined && { farmLocation: input.farmLocation }),
            ...(input.farmDescription !== undefined && { farmDescription: input.farmDescription }),
        });
        const updatedUser = await this.userRepository.findById(userId);
        if (!updatedUser)
            throw new Error('User not found');
        return {
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
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
exports.UpdateFarmerProfileUseCase = UpdateFarmerProfileUseCase;
//# sourceMappingURL=UpdateFarmerProfileUseCase.js.map