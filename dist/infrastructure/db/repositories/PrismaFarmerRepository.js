"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFarmerRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapDbFarmerToDomain(row) {
    return {
        id: row.id,
        userId: row.userId,
        farmName: row.farmName,
        farmLocation: row.farmLocation,
        farmDescription: row.farmDescription,
        approved: row.approved,
        createdAt: row.createdAt,
    };
}
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
function mapToFarmerWithUser(row) {
    return {
        ...mapDbFarmerToDomain(row),
        user: mapDbUserToUser(row.user),
    };
}
class PrismaFarmerRepository {
    async findById(id) {
        const farmer = await prismaClient_1.default.farmer.findUnique({ where: { id } });
        if (!farmer)
            return null;
        return mapDbFarmerToDomain(farmer);
    }
    async findByUserId(userId) {
        const farmer = await prismaClient_1.default.farmer.findUnique({ where: { userId } });
        if (!farmer)
            return null;
        return mapDbFarmerToDomain(farmer);
    }
    async listWithUser(skip, take, filters) {
        const userWhere = {};
        if (filters?.name?.trim())
            userWhere.name = { contains: filters.name.trim(), mode: 'insensitive' };
        if (filters?.phone?.trim())
            userWhere.phone = { contains: filters.phone.trim(), mode: 'insensitive' };
        const hasFilter = Object.keys(userWhere).length > 0;
        const findManyArgs = {
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { user: true },
            ...(hasFilter && { where: { user: userWhere } }),
        };
        const [items, total] = await Promise.all([
            prismaClient_1.default.farmer.findMany(findManyArgs),
            hasFilter
                ? prismaClient_1.default.farmer.count({ where: { user: userWhere } })
                : prismaClient_1.default.farmer.count(),
        ]);
        return {
            items: items.map((row) => mapToFarmerWithUser(row)),
            total,
        };
    }
    async update(id, data) {
        const updated = await prismaClient_1.default.farmer.update({
            where: { id },
            data: {
                ...(data.farmName !== undefined && { farmName: data.farmName }),
                ...(data.farmLocation !== undefined && { farmLocation: data.farmLocation }),
                ...(data.farmDescription !== undefined && { farmDescription: data.farmDescription }),
            },
        });
        return mapDbFarmerToDomain(updated);
    }
}
exports.PrismaFarmerRepository = PrismaFarmerRepository;
//# sourceMappingURL=PrismaFarmerRepository.js.map