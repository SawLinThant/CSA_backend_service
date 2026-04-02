"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListOrdersUseCase = void 0;
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
const ALL_STATUSES = ['pending', 'packed', 'shipped', 'delivered', 'cancelled'];
function parseStatuses(raw) {
    if (!raw?.trim())
        return undefined;
    const parts = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const ok = parts.filter((p) => ALL_STATUSES.includes(p));
    return ok.length ? ok : undefined;
}
class AdminListOrdersUseCase {
    async execute(query) {
        const skip = (query.page - 1) * query.limit;
        const where = {};
        const statusesFromQuery = parseStatuses(query.statuses);
        if (statusesFromQuery?.length) {
            where.status = { in: statusesFromQuery };
        }
        else if (query.status !== undefined) {
            where.status = query.status;
        }
        if (query.from || query.to) {
            where.createdAt = {};
            if (query.from)
                where.createdAt.gte = query.from;
            if (query.to) {
                const end = new Date(query.to);
                end.setHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }
        const q = query.search?.trim();
        if (q) {
            where.AND = [
                ...(Array.isArray(where.AND) ? where.AND : []),
                {
                    OR: [
                        { id: { contains: q, mode: 'insensitive' } },
                        { boxVersion: { box: { name: { contains: q, mode: 'insensitive' } } } },
                        { delivery: { is: { trackingCode: { contains: q, mode: 'insensitive' } } } },
                        { customer: { user: { email: { contains: q, mode: 'insensitive' } } } },
                    ],
                },
            ];
        }
        const orderBy = query.sortBy === 'totalPrice'
            ? { totalPrice: query.sortOrder }
            : { createdAt: query.sortOrder };
        const [rows, total] = await Promise.all([
            prismaClient_1.default.order.findMany({
                where,
                skip,
                take: query.limit,
                orderBy,
                include: {
                    customer: { select: { id: true, user: { select: { id: true, email: true, name: true } } } },
                    boxVersion: {
                        select: {
                            id: true,
                            versionName: true,
                            box: { select: { id: true, name: true, imageUrl: true } },
                        },
                    },
                    subscription: {
                        select: {
                            id: true,
                            plan: { select: { id: true, name: true } },
                        },
                    },
                    delivery: {
                        select: {
                            deliveryStatus: true,
                            trackingCode: true,
                            deliveryDriver: true,
                            deliveredAt: true,
                        },
                    },
                },
            }),
            prismaClient_1.default.order.count({ where }),
        ]);
        const items = rows.map((order) => ({
            id: order.id,
            status: order.status,
            totalPrice: Number(order.totalPrice),
            cycleDate: order.cycleDate?.toISOString() ?? null,
            deliveryDate: order.deliveryDate?.toISOString() ?? null,
            createdAt: order.createdAt.toISOString(),
            customer: {
                id: order.customer.id,
                user: {
                    id: order.customer.user.id,
                    email: order.customer.user.email,
                    name: order.customer.user.name,
                },
            },
            box: {
                id: order.boxVersion.box.id,
                name: order.boxVersion.box.name,
                imageUrl: order.boxVersion.box.imageUrl,
            },
            boxVersion: {
                id: order.boxVersion.id,
                versionName: order.boxVersion.versionName,
            },
            subscription: order.subscription
                ? {
                    id: order.subscription.id,
                    plan: {
                        id: order.subscription.plan.id,
                        name: order.subscription.plan.name,
                    },
                }
                : null,
            delivery: order.delivery
                ? {
                    status: order.delivery.deliveryStatus,
                    trackingCode: order.delivery.trackingCode,
                    deliveryDriver: order.delivery.deliveryDriver,
                    deliveredAt: order.delivery.deliveredAt?.toISOString() ?? null,
                }
                : null,
        }));
        return {
            items,
            total,
            page: query.page,
            limit: query.limit,
            totalPages: Math.max(1, Math.ceil(total / query.limit)),
        };
    }
}
exports.AdminListOrdersUseCase = AdminListOrdersUseCase;
//# sourceMappingURL=AdminListOrdersUseCase.js.map