"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerProfileUseCase = void 0;
class GetCustomerProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        if (user.role !== 'customer')
            throw new Error('Forbidden');
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
exports.GetCustomerProfileUseCase = GetCustomerProfileUseCase;
//# sourceMappingURL=GetCustomerProfileUseCase.js.map