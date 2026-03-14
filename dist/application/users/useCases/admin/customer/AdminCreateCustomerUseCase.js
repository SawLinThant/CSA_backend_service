"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateCustomerUseCase = void 0;
const passwordHasher_1 = require("../../../../../core/security/passwordHasher");
const prismaClient_1 = __importDefault(require("../../../../../infrastructure/db/prismaClient"));
class AdminCreateCustomerUseCase {
    constructor(userRepository, customerRepository) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const existingPhone = await this.userRepository.findByPhone(input.phone);
        if (existingPhone)
            throw new Error('Phone already in use');
        if (input.email) {
            const existingEmail = await this.userRepository.findByEmail(input.email);
            if (existingEmail)
                throw new Error('Email already in use');
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
                data: { userId: user.id },
            });
            return { user, customer };
        });
        return {
            id: result.customer.id,
            userId: result.user.id,
            defaultAddressId: null,
            createdAt: result.customer.createdAt,
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                phone: result.user.phone,
                role: result.user.role,
                status: result.user.status,
            },
        };
    }
}
exports.AdminCreateCustomerUseCase = AdminCreateCustomerUseCase;
//# sourceMappingURL=AdminCreateCustomerUseCase.js.map