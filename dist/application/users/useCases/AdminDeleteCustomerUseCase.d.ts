import type { CustomerRepository } from '../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../domain/users/UserRepository';
export declare class AdminDeleteCustomerUseCase {
    private readonly customerRepository;
    private readonly userRepository;
    constructor(customerRepository: CustomerRepository, userRepository: UserRepository);
    execute(customerId: string): Promise<void>;
}
//# sourceMappingURL=AdminDeleteCustomerUseCase.d.ts.map