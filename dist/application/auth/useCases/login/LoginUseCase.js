"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const passwordHasher_1 = require("../../../../core/security/passwordHasher");
const jwt_1 = require("../../../../core/security/jwt");
class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input, expectedRole) {
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
        const valid = await passwordHasher_1.passwordHasher.verify(user.passwordHash, input.password);
        if (!valid) {
            throw new Error('Invalid credentials');
        }
        const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, role: user.role });
        const refreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id, role: user.role, type: 'refresh' });
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
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map