import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { AdminUpdateCustomerInput } from '../../../dtos/userDtos';
export declare class AdminUpdateCustomerUseCase {
    private readonly userRepository;
    private readonly customerRepository;
    constructor(userRepository: UserRepository, customerRepository: CustomerRepository);
    execute(customerId: string, input: AdminUpdateCustomerInput): Promise<{
        id: string;
        userId: string;
        defaultAddressId: string | null;
        createdAt: Date;
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            role: import("../../../../../domain/users/User").UserRole;
            status: "active" | "suspended";
        };
    }>;
}
//# sourceMappingURL=AdminUpdateCustomerUseCase.d.ts.map