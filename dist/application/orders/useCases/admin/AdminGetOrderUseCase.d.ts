export declare class AdminGetOrderUseCase {
    execute(orderId: string): Promise<{
        id: string;
        status: import("../../../../generated/prisma/enums").OrderStatus;
        totalPrice: number;
        cycleDate: string | null;
        deliveryDate: string | null;
        createdAt: string;
        customer: {
            id: string;
            user: {
                id: string;
                email: string | null;
                name: string;
                phone: string;
                addresses: {
                    id: string;
                    addressLine: string;
                    city: string;
                    state: string;
                    postalCode: string;
                    country: string;
                    isDefault: boolean;
                }[];
            };
        };
        box: {
            id: string;
            name: string;
            description: string | null;
            imageUrl: string | null;
        };
        boxVersion: {
            id: string;
            versionName: string;
            startDate: string;
            endDate: string | null;
        };
        subscription: {
            id: string;
            status: import("../../../../generated/prisma/enums").SubscriptionStatus;
            plan: {
                id: string;
                name: string;
                price: number;
                deliveryFrequency: import("../../../../generated/prisma/enums").DeliveryFrequency;
            };
        } | null;
        items: {
            id: string;
            quantity: number;
            unitPrice: number;
            lineTotal: number;
            product: {
                id: string;
                name: string;
                unit: string;
            };
            farmer: {
                id: string;
                farmName: string;
            };
        }[];
        delivery: {
            deliveryStatus: import("../../../../generated/prisma/enums").DeliveryStatus;
            deliveryDriver: string | null;
            trackingCode: string | null;
            deliveredAt: string | null;
        } | null;
        payments: {
            id: string;
            amount: number;
            paymentMethod: string;
            paymentStatus: import("../../../../generated/prisma/enums").PaymentStatus;
            transactionReference: string | null;
            paidAt: string | null;
        }[];
    }>;
}
//# sourceMappingURL=AdminGetOrderUseCase.d.ts.map