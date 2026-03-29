import type { UserRole } from '../../../domain/users/User';
import type { Farmer } from '../../../domain/farmers/Farmer';
import type {
  FarmerRepository,
  FarmerUpdateData,
  FarmerWithUser,
  FarmerListFilters,
} from '../../../domain/farmers/FarmerRepository';
import prisma from '../prismaClient';

function mapDbFarmerToDomain(row: {
  id: string;
  userId: string;
  farmName: string;
  farmLocation: string;
  farmDescription: string | null;
  approved: boolean;
  createdAt: Date;
}): Farmer {
  return {
    id: row.id,
    userId: row.userId,
    farmName: row.farmName,
    farmLocation: row.farmLocation,
    farmDescription: row.farmDescription,
    approved: row.approved,
    createdAt: row.createdAt,
  };
}

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
}) {
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

function mapToFarmerWithUser(row: {
  id: string;
  userId: string;
  farmName: string;
  farmLocation: string;
  farmDescription: string | null;
  approved: boolean;
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
  };
}): FarmerWithUser {
  return {
    ...mapDbFarmerToDomain(row),
    user: mapDbUserToUser(row.user),
  };
}

export class PrismaFarmerRepository implements FarmerRepository {
  async findById(id: string): Promise<Farmer | null> {
    const farmer = await prisma.farmer.findUnique({ where: { id } });
    if (!farmer) return null;
    return mapDbFarmerToDomain(farmer);
  }

  async findByUserId(userId: string): Promise<Farmer | null> {
    const farmer = await prisma.farmer.findUnique({ where: { userId } });
    if (!farmer) return null;
    return mapDbFarmerToDomain(farmer);
  }

  async listWithUser(
    skip: number,
    take: number,
    filters?: FarmerListFilters,
  ): Promise<{ items: FarmerWithUser[]; total: number }> {
    type UserWhere = {
      name?: { contains: string; mode: 'insensitive' };
      phone?: { contains: string; mode: 'insensitive' };
    };
    const userWhere: UserWhere = {};
    if (filters?.name?.trim()) userWhere.name = { contains: filters.name.trim(), mode: 'insensitive' };
    if (filters?.phone?.trim()) userWhere.phone = { contains: filters.phone.trim(), mode: 'insensitive' };
    const hasFilter = Object.keys(userWhere).length > 0;

    const findManyArgs = {
      skip,
      take,
      orderBy: { createdAt: 'desc' as const },
      include: { user: true } as const,
      ...(hasFilter && { where: { user: userWhere } }),
    };

    const [items, total] = await Promise.all([
      prisma.farmer.findMany(findManyArgs as Parameters<typeof prisma.farmer.findMany>[0]),
      hasFilter
        ? prisma.farmer.count({ where: { user: userWhere } } as Parameters<typeof prisma.farmer.count>[0])
        : prisma.farmer.count(),
    ]);

    type RowWithUser = Awaited<ReturnType<typeof prisma.farmer.findMany<{ include: { user: true } }>>>[number];
    return {
      items: (items as RowWithUser[]).map((row) => mapToFarmerWithUser(row)),
      total,
    };
  }

  async update(id: string, data: FarmerUpdateData): Promise<Farmer> {
    const updated = await prisma.farmer.update({
      where: { id },
      data: {
        ...(data.farmName !== undefined && { farmName: data.farmName }),
        ...(data.farmLocation !== undefined && { farmLocation: data.farmLocation }),
        ...(data.farmDescription !== undefined && { farmDescription: data.farmDescription }),
      },
    });
    return mapDbFarmerToDomain(updated);
  }
}
