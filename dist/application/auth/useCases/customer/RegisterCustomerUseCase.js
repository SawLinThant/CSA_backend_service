"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCustomerUseCase = void 0;
const passwordHasher_1 = require("../../../../core/security/passwordHasher");
const jwt_1 = require("../../../../core/security/jwt");
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
class RegisterCustomerUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const existingByPhone = await this.userRepository.findByPhone(input.phone);
        if (existingByPhone) {
            throw new Error('Phone already in use');
        }
        if (input.email) {
            const existingByEmail = await this.userRepository.findByEmail(input.email);
            if (existingByEmail) {
                throw new Error('Email already in use');
            }
        }
        const passwordHash = await passwordHasher_1.passwordHasher.hash(input.password);
        const result = await prismaClient_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: input.name,
                    email: input.email ?? null,
                    phone: input.phone,
                    password: passwordHash,
                    role: 'customer',
                    status: 'active',
                },
            });
            const customer = await tx.customer.create({
                data: {
                    userId: user.id,
                },
            });
            return { user, customer };
        });
        const accessToken = (0, jwt_1.signAccessToken)({ sub: result.user.id, role: 'customer' });
        const { refreshToken } = (0, jwt_1.issueRefreshToken)({ sub: result.user.id, role: 'customer' });
        return {
            accessToken,
            refreshToken,
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
        };
    }
}
exports.RegisterCustomerUseCase = RegisterCustomerUseCase;
//# sourceMappingURL=RegisterCustomerUseCase.js.map