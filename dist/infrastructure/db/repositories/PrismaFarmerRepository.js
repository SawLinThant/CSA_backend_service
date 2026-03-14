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