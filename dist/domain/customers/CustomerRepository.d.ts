import type { Customer } from './Customer';
export interface CustomerRepository {
    findById(id: string): Promise<Customer | null>;
    findByUserId(userId: string): Promise<Customer | null>;
    create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer>;
}
//# sourceMappingURL=CustomerRepository.d.ts.map