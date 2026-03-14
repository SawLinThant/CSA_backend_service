import type { CustomerRepository } from '../../../domain/customers/CustomerRepository';
export declare class AdminGetCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(customerId: string): Promise<{
        id: string;
        userId: string;
        defaultAddressId: string | null;
        createdAt: Date;
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            role: import("../../../domain/users/User").UserRole;
            status: "active" | "suspended";
        };
    }>;
}
//# sourceMappingURL=AdminGetCustomerUseCase.d.ts.map