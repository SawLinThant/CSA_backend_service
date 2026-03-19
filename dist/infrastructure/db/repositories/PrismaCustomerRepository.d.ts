import type { Customer } from '../../../domain/customers/Customer';
import type { CustomerRepository, CustomerWithUser, CustomerUpdateData, CustomerListFilters } from '../../../domain/customers/CustomerRepository';
export declare class PrismaCustomerRepository implements CustomerRepository {
    findById(id: string): Promise<Customer | null>;
    findByUserId(userId: string): Promise<Customer | null>;
    create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer>;
    listWithUser(skip: number, take: number, filters?: CustomerListFilters): Promise<{
        items: CustomerWithUser[];
        total: number;
    }>;
    getByIdWithUser(id: string): Promise<CustomerWithUser | null>;
    update(id: string, _data: CustomerUpdateData): Promise<Customer>;
}
//# sourceMappingURL=PrismaCustomerRepository.d.ts.map