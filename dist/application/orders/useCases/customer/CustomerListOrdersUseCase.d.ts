import type { OrderStatus } from '../../../../generated/prisma/enums';
import type { CustomerRepository } from '../../../../domain/customers/CustomerRepository';
import type { ListCustomerOrdersQuery } from '../../dtos/customerOrderDtos';
export declare class CustomerListOrdersUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(userId: string, query: ListCustomerOrdersQuery): Promise<{
        items: {
            id: string;
            status: OrderStatus;
            totalPrice: number;
            cycleDate: string | null;
            deliveryDate: string | null;
            createdAt: string;
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
            } | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=CustomerListOrdersUseCase.d.ts.map