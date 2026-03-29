"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerListOrdersUseCase = void 0;
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
class CustomerListOrdersUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(userId, query) {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer)
            throw new Error('Customer profile not found');
        const skip = (query.page - 1) * query.limit;
        const where = { customerId: customer.id };
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
exports.CustomerListOrdersUseCase = CustomerListOrdersUseCase;
//# sourceMappingURL=CustomerListOrdersUseCase.js.map