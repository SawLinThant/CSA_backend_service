import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { AdminCreateCustomerInput } from '../../../dtos/userDtos';
export declare class AdminCreateCustomerUseCase {
    private readonly userRepository;
    private readonly customerRepository;
    constructor(userRepository: UserRepository, customerRepository: CustomerRepository);
    execute(input: AdminCreateCustomerInput): Promise<{
        id: string;
        userId: string;
        defaultAddressId: null;
        createdAt: Date;
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            role: import("../../../../../generated/prisma/enums").UserRole;
            status: import("../../../../../generated/prisma/enums").UserStatus;
        };
    }>;
}
//# sourceMappingURL=AdminCreateCustomerUseCase.d.ts.map