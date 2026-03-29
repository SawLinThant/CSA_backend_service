export interface OrderFactoryItemInput {
    productId: string;
    farmerId: string;
    quantity: number;
    unitPrice: number;
}
export interface OrderFactoryInput {
    customerId: string;
    subscriptionId: string;
    boxVersionId: string;
    cycleDate: Date;
    items: OrderFactoryItemInput[];
}
export declare class OrderFromSubscriptionFactory {
    build(input: OrderFactoryInput): {
        order: {
            customerId: string;
            subscriptionId: string;
            boxVersionId: string;
            cycleDate: Date;
            deliveryDate: Date;
            totalPrice: number;
        };
        orderItems: Array<{
            productId: string;
            farmerId: string;
            quantity: number;
            price: number;
        }>;
    };
}
//# sourceMappingURL=OrderFromSubscriptionFactory.d.ts.map