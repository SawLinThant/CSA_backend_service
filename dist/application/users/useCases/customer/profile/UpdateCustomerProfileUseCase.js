"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerProfileUseCase = void 0;
class UpdateCustomerProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, input) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        if (user.role !== 'customer')
            throw new Error('Forbidden');
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
        const updated = await this.userRepository.update(userId, {
            ...(input.name !== undefined && { name: input.name }),
            ...(input.phone !== undefined && { phone: input.phone }),
            ...(input.email !== undefined && { email: input.email }),
            ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
        });
        return {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            phone: updated.phone,
            imageUrl: updated.imageUrl,
            role: updated.role,
        };
    }
}
exports.UpdateCustomerProfileUseCase = UpdateCustomerProfileUseCase;
//# sourceMappingURL=UpdateCustomerProfileUseCase.js.map