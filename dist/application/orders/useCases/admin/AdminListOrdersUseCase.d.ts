import type { OrderStatus } from '../../../../generated/prisma/enums';
import type { ListCustomerOrdersQuery } from '../../dtos/customerOrderDtos';
export declare class AdminListOrdersUseCase {
    execute(query: ListCustomerOrdersQuery): Promise<{
        items: {
            id: string;
            status: OrderStatus;
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
                };
            };
            box: {
                id: string;
                name: string;
                imageUrl: string | null;
            };
            boxVersion: {
                id: string;
                versionName: string;
            };
            subscription: {
                id: string;
                plan: {
                    id: string;
                    name: string;
                };
            } | null;
            delivery: {
                status: import("../../../../generated/prisma/enums").DeliveryStatus;
                trackingCode: string | null;
                deliveryDriver: string | null;
                deliveredAt: string | null;
            } | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=AdminListOrdersUseCase.d.ts.map