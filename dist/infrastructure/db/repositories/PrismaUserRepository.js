"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapDbUserToDomain(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        passwordHash: user.password,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
    };
}
class PrismaUserRepository {
    async findById(id) {
        const user = await prismaClient_1.default.user.findUnique({ where: { id } });
        if (!user)
            return null;
        return mapDbUserToDomain(user);
    }
    async findByEmail(email) {
        const user = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user)
            return null;
        return mapDbUserToDomain(user);
    }
    async findByPhone(phone) {
        const user = await prismaClient_1.default.user.findUnique({ where: { phone } });
        if (!user)
            return null;
        return mapDbUserToDomain(user);
    }
    async create(user) {
        const created = await prismaClient_1.default.user.create({
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.passwordHash,
                role: user.role,
                status: user.status,
            },
        });
        return mapDbUserToDomain(created);
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
//# sourceMappingURL=PrismaUserRepository.js.map