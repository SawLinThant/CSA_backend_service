import type { User } from './User';
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
}
//# sourceMappingURL=UserRepository.d.ts.map