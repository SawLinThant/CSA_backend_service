import type { User, UserRole } from '../../../domain/users/User';
import type { UserRepository } from '../../../domain/users/UserRepository';
import prisma from '../prismaClient';

function mapDbUserToDomain(user: {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  password: string;
  role: UserRole;
  status: 'active' | 'suspended';
  createdAt: Date;
}): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    passwordHash: user.password,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return mapDbUserToDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return mapDbUserToDomain(user);
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return null;
    return mapDbUserToDomain(user);
  }

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.passwordHash,
        role: user.role,
        status: user.status,
      },
    });

    return mapDbUserToDomain(created);
  }
}

