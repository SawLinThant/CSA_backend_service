import type { CustomerRepository } from '../../../domain/customers/CustomerRepository';
import type { ListCustomersQuery } from '../dtos/userDtos';
export declare class AdminListCustomersUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(query: ListCustomersQuery): Promise<{
        items: {
            id: string;
            userId: string;
            defaultAddressId: string | null;
            createdAt: Date;
            user: {
                id: string;
                name: string;
                email: string | null;
                phone: string;
                role: string;
            };
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=AdminListCustomersUseCase.d.ts.map