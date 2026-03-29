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

export class OrderFromSubscriptionFactory {
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
  } {
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

