export type UserRole = 'admin' | 'customer' | 'farmer';
export interface User {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    imageUrl: string | null;
    passwordHash: string;
    role: UserRole;
    status: 'active' | 'suspended';
    createdAt: Date;
}
//# sourceMappingURL=User.d.ts.map