import type { UserRole } from '../users/User';
import type { User } from '../users/User';
import type { Customer } from './Customer';

export type CustomerWithUser = Customer & { user: User };

export type CustomerUpdateData = Partial<Pick<Customer, never>>;

export interface CustomerListFilters {
  name?: string;
  phone?: string;
  role?: UserRole;
}

export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>;
  findByUserId(userId: string): Promise<Customer | null>;
  create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer>;
  listWithUser(
    skip: number,
    take: number,
    filters?: CustomerListFilters,
  ): Promise<{ items: CustomerWithUser[]; total: number }>;
  getByIdWithUser(id: string): Promise<CustomerWithUser | null>;
  update(id: string, data: CustomerUpdateData): Promise<Customer>;
}

