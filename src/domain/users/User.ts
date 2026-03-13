export type UserRole = 'admin' | 'customer' | 'farmer';

export interface User {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  passwordHash: string;
  role: UserRole;
  status: 'active' | 'suspended';
  createdAt: Date;
}

