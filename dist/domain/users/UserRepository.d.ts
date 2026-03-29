import type { User } from './User';
export type UserUpdateData = Partial<Pick<User, 'name' | 'email' | 'phone' | 'imageUrl' | 'status'>>;
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    update(id: string, data: UserUpdateData): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map