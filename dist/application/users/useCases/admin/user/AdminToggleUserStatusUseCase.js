"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminToggleUserStatusUseCase = void 0;
class AdminToggleUserStatusUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(targetUserId, actorAdminUserId) {
        if (targetUserId === actorAdminUserId) {
            throw new Error('You cannot change your own status');
        }
        const user = await this.userRepository.findById(targetUserId);
        if (!user)
            throw new Error('User not found');
        const nextStatus = user.status === 'active' ? 'suspended' : 'active';
        return this.userRepository.update(targetUserId, { status: nextStatus });
    }
}
exports.AdminToggleUserStatusUseCase = AdminToggleUserStatusUseCase;
//# sourceMappingURL=AdminToggleUserStatusUseCase.js.map