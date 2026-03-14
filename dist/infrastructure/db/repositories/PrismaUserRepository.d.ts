import type { User } from '../../../domain/users/User';
import type { UserRepository, UserUpdateData } from '../../../domain/users/UserRepository';
export declare class PrismaUserRepository implements UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    update(id: string, data: UserUpdateData): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaUserRepository.d.ts.map