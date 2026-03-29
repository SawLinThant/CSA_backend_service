"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFromSubscriptionFactory = void 0;
class OrderFromSubscriptionFactory {
    build(input) {
        const totalPrice = input.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        return {
            order: {
                customerId: input.customerId,
                subscriptionId: input.subscriptionId,
                boxVersionId: input.boxVersionId,
                cycleDate: input.cycleDate,
                deliveryDate: input.cycleDate,
                totalPrice,
            },
            orderItems: input.items.map((item) => ({
                productId: item.productId,
                farmerId: item.farmerId,
                quantity: item.quantity,
                price: item.unitPrice,
            })),
        };
    }
}
exports.OrderFromSubscriptionFactory = OrderFromSubscriptionFactory;
//# sourceMappingURL=OrderFromSubscriptionFactory.js.map