"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetOrderUseCase = void 0;
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
class AdminGetOrderUseCase {
    async execute(orderId) {
        const order = await prismaClient_1.default.order.findUnique({
            where: { id: orderId },
            include: {
                customer: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                phone: true,
                                addresses: {
                                    select: {
                                        id: true,
                                        addressLine: true,
                                        city: true,
                                        state: true,
                                        postalCode: true,
                                        country: true,
                                        isDefault: true,
                                    },
                                    orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
                                },
                            },
                        },
                    },
                },
                boxVersion: {
                    select: {
                        id: true,
                        versionName: true,
                        startDate: true,
                        endDate: true,
                        box: { select: { id: true, name: true, description: true, imageUrl: true } },
                    },
                },
                subscription: {
                    select: {
                        id: true,
                        status: true,
                        plan: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                deliveryFrequency: true,
                            },
                        },
                    },
                },
                items: {
                    include: {
                        product: { select: { id: true, name: true, unit: true } },
                        farmer: { select: { id: true, farmName: true } },
                    },
                    orderBy: { id: 'asc' },
                },
                delivery: true,
                payments: { orderBy: { id: 'asc' } },
            },
        });
        if (!order)
            throw new Error('Order not found');
        return {
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
                    phone: order.customer.user.phone,
                    addresses: order.customer.user.addresses.map((a) => ({
                        id: a.id,
                        addressLine: a.addressLine,
                        city: a.city,
                        state: a.state,
                        postalCode: a.postalCode,
                        country: a.country,
                        isDefault: a.isDefault,
                    })),
                },
            },
            box: {
                id: order.boxVersion.box.id,
                name: order.boxVersion.box.name,
                description: order.boxVersion.box.description,
                imageUrl: order.boxVersion.box.imageUrl,
            },
            boxVersion: {
                id: order.boxVersion.id,
                versionName: order.boxVersion.versionName,
                startDate: order.boxVersion.startDate.toISOString(),
                endDate: order.boxVersion.endDate?.toISOString() ?? null,
            },
            subscription: order.subscription
                ? {
                    id: order.subscription.id,
                    status: order.subscription.status,
                    plan: {
                        id: order.subscription.plan.id,
                        name: order.subscription.plan.name,
                        price: Number(order.subscription.plan.price),
                        deliveryFrequency: order.subscription.plan.deliveryFrequency,
                    },
                }
                : null,
            items: order.items.map((line) => ({
                id: line.id,
                quantity: line.quantity,
                unitPrice: Number(line.price),
                lineTotal: Number(line.price) * line.quantity,
                product: {
                    id: line.product.id,
                    name: line.product.name,
                    unit: line.product.unit,
                },
                farmer: {
                    id: line.farmer.id,
                    farmName: line.farmer.farmName,
                },
            })),
            delivery: order.delivery
                ? {
                    deliveryStatus: order.delivery.deliveryStatus,
                    deliveryDriver: order.delivery.deliveryDriver,
                    trackingCode: order.delivery.trackingCode,
                    deliveredAt: order.delivery.deliveredAt?.toISOString() ?? null,
                }
                : null,
            payments: order.payments.map((p) => ({
                id: p.id,
                amount: Number(p.amount),
                paymentMethod: p.paymentMethod,
                paymentStatus: p.paymentStatus,
                transactionReference: p.transactionReference,
                paidAt: p.paidAt?.toISOString() ?? null,
            })),
        };
    }
}
exports.AdminGetOrderUseCase = AdminGetOrderUseCase;
//# sourceMappingURL=AdminGetOrderUseCase.js.map