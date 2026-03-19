"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCustomerRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapDbUserToUser(user) {
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
function mapToCustomerWithUser(row) {
    return {
        id: row.id,
        userId: row.userId,
        createdAt: row.createdAt,
        user: mapDbUserToUser(row.user),
    };
}
class PrismaCustomerRepository {
    async findById(id) {
        const customer = await prismaClient_1.default.customer.findUnique({ where: { id } });
        if (!customer)
            return null;
        return {
            id: customer.id,
            userId: customer.userId,
            createdAt: customer.createdAt,
        };
    }
    async findByUserId(userId) {
        const customer = await prismaClient_1.default.customer.findUnique({ where: { userId } });
        if (!customer)
            return null;
        return {
            id: customer.id,
            userId: customer.userId,
            createdAt: customer.createdAt,
        };
    }
    async create(customer) {
        const created = await prismaClient_1.default.customer.create({
            data: {
                userId: customer.userId,
            },
        });
        return {
            id: created.id,
            userId: created.userId,
            createdAt: created.createdAt,
        };
    }
    async listWithUser(skip, take, filters) {
        const userWhere = {};
        if (filters?.name?.trim())
            userWhere.name = { contains: filters.name.trim(), mode: 'insensitive' };
        if (filters?.phone?.trim())
            userWhere.phone = { contains: filters.phone.trim(), mode: 'insensitive' };
        if (filters?.role)
            userWhere.role = filters.role;
        const hasFilter = Object.keys(userWhere).length > 0;
        const findManyArgs = {
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { user: true },
            ...(hasFilter && { where: { user: userWhere } }),
        };
        const [items, total] = await Promise.all([
            prismaClient_1.default.customer.findMany(findManyArgs),
            hasFilter ? prismaClient_1.default.customer.count({ where: { user: userWhere } }) : prismaClient_1.default.customer.count(),
        ]);
        return {
            items: items.map((row) => mapToCustomerWithUser(row)),
            total,
        };
    }
    async getByIdWithUser(id) {
        const row = await prismaClient_1.default.customer.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!row)
            return null;
        return mapToCustomerWithUser(row);
    }
    async update(id, _data) {
        const customer = await prismaClient_1.default.customer.findUnique({ where: { id } });
        if (!customer)
            throw new Error('Customer not found');
        return {
            id: customer.id,
            userId: customer.userId,
            createdAt: customer.createdAt,
        };
    }
}
exports.PrismaCustomerRepository = PrismaCustomerRepository;
//# sourceMappingURL=PrismaCustomerRepository.js.map