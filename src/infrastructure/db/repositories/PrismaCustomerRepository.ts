import type { User, UserRole } from '../../../domain/users/User';
import type { Customer } from '../../../domain/customers/Customer';
import type {
  CustomerRepository,
  CustomerWithUser,
  CustomerUpdateData,
  CustomerListFilters,
} from '../../../domain/customers/CustomerRepository';
import prisma from '../prismaClient';

function mapDbUserToUser(user: {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  imageUrl: string | null;
  password: string;
  role: UserRole;
  status: 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    imageUrl: user.imageUrl,
    passwordHash: user.password,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

function mapToCustomerWithUser(row: {
  id: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    imageUrl: string | null;
    password: string;
    role: UserRole;
    status: 'active' | 'suspended';
    createdAt: Date;
    updatedAt: Date;
  };
}): CustomerWithUser {
  return {
    id: row.id,
    userId: row.userId,
    createdAt: row.createdAt,
    user: mapDbUserToUser(row.user),
  };
}

export class PrismaCustomerRepository implements CustomerRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) return null;
    return {
      id: customer.id,
      userId: customer.userId,
      createdAt: customer.createdAt,
    };
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({ where: { userId } });
    if (!customer) return null;
    return {
      id: customer.id,
      userId: customer.userId,
      createdAt: customer.createdAt,
    };
  }

  async create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const created = await prisma.customer.create({
      data: {
        userId: customer.userId,
      },
    });
    return {
      id: created.id,
      userId: created.userId,
      createdAt: created.createdAt,
    };
  }

  async listWithUser(
    skip: number,
    take: number,
    filters?: CustomerListFilters,
  ): Promise<{ items: CustomerWithUser[]; total: number }> {
    type UserWhere = { name?: { contains: string; mode: 'insensitive' }; phone?: { contains: string; mode: 'insensitive' }; role?: import('../../../domain/users/User').UserRole };
    const userWhere: UserWhere = {};
    if (filters?.name?.trim()) userWhere.name = { contains: filters.name.trim(), mode: 'insensitive' };
    if (filters?.phone?.trim()) userWhere.phone = { contains: filters.phone.trim(), mode: 'insensitive' };
    if (filters?.role) userWhere.role = filters.role;
    const hasFilter = Object.keys(userWhere).length > 0;

    const findManyArgs = {
      skip,
      take,
      orderBy: { createdAt: 'desc' as const },
      include: { user: true } as const,
      ...(hasFilter && { where: { user: userWhere } }),
    };

    const [items, total] = await Promise.all([
      prisma.customer.findMany(findManyArgs as Parameters<typeof prisma.customer.findMany>[0]),
      hasFilter ? prisma.customer.count({ where: { user: userWhere } } as Parameters<typeof prisma.customer.count>[0]) : prisma.customer.count(),
    ]);

    type RowWithUser = Awaited<ReturnType<typeof prisma.customer.findMany<{ include: { user: true } }>>>[number];
    return {
      items: (items as RowWithUser[]).map((row) => mapToCustomerWithUser(row)),
      total,
    };
  }

  async getByIdWithUser(id: string): Promise<CustomerWithUser | null> {
    const row = await prisma.customer.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!row) return null;
    return mapToCustomerWithUser(row);
  }

  async update(id: string, _data: CustomerUpdateData): Promise<Customer> {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new Error('Customer not found');
    return {
      id: customer.id,
      userId: customer.userId,
      createdAt: customer.createdAt,
    };
  }
}
