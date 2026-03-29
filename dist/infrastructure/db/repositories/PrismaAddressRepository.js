"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAddressRepository = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
function mapRow(row) {
    return {
        id: row.id,
        userId: row.userId,
        addressLine: row.addressLine,
        city: row.city,
        state: row.state,
        postalCode: row.postalCode,
        country: row.country,
        isDefault: row.isDefault,
    };
}
class PrismaAddressRepository {
    async listByUserId(userId) {
        const rows = await prismaClient_1.default.address.findMany({
            where: { userId },
            orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
        });
        return rows.map(mapRow);
    }
    async findById(id) {
        const row = await prismaClient_1.default.address.findUnique({ where: { id } });
        return row ? mapRow(row) : null;
    }
    async findByIdAndUserId(id, userId) {
        const row = await prismaClient_1.default.address.findFirst({ where: { id, userId } });
        return row ? mapRow(row) : null;
    }
    async createForUser(userId, data) {
        const created = await prismaClient_1.default.$transaction(async (tx) => {
            const hasAny = (await tx.address.count({ where: { userId } })) > 0;
            const shouldBeDefault = data.isDefault === true || !hasAny;
            if (shouldBeDefault) {
                await tx.address.updateMany({
                    where: { userId, isDefault: true },
                    data: { isDefault: false },
                });
            }
            return tx.address.create({
                data: {
                    userId,
                    addressLine: data.addressLine,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                    isDefault: shouldBeDefault,
                },
            });
        });
        return mapRow(created);
    }
    async updateForUser(id, userId, data) {
        const updated = await prismaClient_1.default.$transaction(async (tx) => {
            const existing = await tx.address.findFirst({ where: { id, userId } });
            if (!existing)
                throw new Error('Address not found');
            if (data.isDefault === true) {
                await tx.address.updateMany({
                    where: { userId, isDefault: true, NOT: { id } },
                    data: { isDefault: false },
                });
            }
            return tx.address.update({
                where: { id },
                data: {
                    ...(data.addressLine !== undefined && { addressLine: data.addressLine }),
                    ...(data.city !== undefined && { city: data.city }),
                    ...(data.state !== undefined && { state: data.state }),
                    ...(data.postalCode !== undefined && { postalCode: data.postalCode }),
                    ...(data.country !== undefined && { country: data.country }),
                    ...(data.isDefault !== undefined && { isDefault: data.isDefault }),
                },
            });
        });
        return mapRow(updated);
    }
    async deleteForUser(id, userId) {
        await prismaClient_1.default.$transaction(async (tx) => {
            const existing = await tx.address.findFirst({ where: { id, userId } });
            if (!existing)
                throw new Error('Address not found');
            await tx.address.delete({ where: { id } });
            if (existing.isDefault) {
                const fallback = await tx.address.findFirst({ where: { userId }, orderBy: { id: 'asc' } });
                if (fallback) {
                    await tx.address.update({
                        where: { id: fallback.id },
                        data: { isDefault: true },
                    });
                }
            }
        });
    }
}
exports.PrismaAddressRepository = PrismaAddressRepository;
//# sourceMappingURL=PrismaAddressRepository.js.map