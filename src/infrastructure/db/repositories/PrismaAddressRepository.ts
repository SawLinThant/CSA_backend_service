import type { Address } from '../../../domain/addresses/Address';
import type { AddressCreateData, AddressRepository, AddressUpdateData } from '../../../domain/addresses/AddressRepository';
import prisma from '../prismaClient';

function mapRow(row: {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}): Address {
  return {
    id: row.id,
    userId: row.userId,
    addressLine: row.addressLine,
    city: row.city,
    state: row.state,
    postalCode: row.postalCode,
    country: row.country,
    isDefault: row.isDefault,
  };
}

export class PrismaAddressRepository implements AddressRepository {
  async listByUserId(userId: string): Promise<Address[]> {
    const rows = await prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
    });
    return rows.map(mapRow);
  }

  async findById(id: string): Promise<Address | null> {
    const row = await prisma.address.findUnique({ where: { id } });
    return row ? mapRow(row) : null;
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Address | null> {
    const row = await prisma.address.findFirst({ where: { id, userId } });
    return row ? mapRow(row) : null;
  }

  async createForUser(userId: string, data: AddressCreateData): Promise<Address> {
    const created = await prisma.$transaction(async (tx) => {
      const hasAny = (await tx.address.count({ where: { userId } })) > 0;
      const shouldBeDefault = data.isDefault === true || !hasAny;

      if (shouldBeDefault) {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: {
          userId,
          addressLine: data.addressLine,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          isDefault: shouldBeDefault,
        },
      });
    });

    return mapRow(created);
  }

  async updateForUser(id: string, userId: string, data: AddressUpdateData): Promise<Address> {
    const updated = await prisma.$transaction(async (tx) => {
      const existing = await tx.address.findFirst({ where: { id, userId } });
      if (!existing) throw new Error('Address not found');

      if (data.isDefault === true) {
        await tx.address.updateMany({
          where: { userId, isDefault: true, NOT: { id } },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id },
        data: {
          ...(data.addressLine !== undefined && { addressLine: data.addressLine }),
          ...(data.city !== undefined && { city: data.city }),
          ...(data.state !== undefined && { state: data.state }),
          ...(data.postalCode !== undefined && { postalCode: data.postalCode }),
          ...(data.country !== undefined && { country: data.country }),
          ...(data.isDefault !== undefined && { isDefault: data.isDefault }),
        },
      });
    });

    return mapRow(updated);
  }

  async deleteForUser(id: string, userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const existing = await tx.address.findFirst({ where: { id, userId } });
      if (!existing) throw new Error('Address not found');

      await tx.address.delete({ where: { id } });

      if (existing.isDefault) {
        const fallback = await tx.address.findFirst({ where: { userId }, orderBy: { id: 'asc' } });
        if (fallback) {
          await tx.address.update({
            where: { id: fallback.id },
            data: { isDefault: true },
          });
        }
      }
    });
  }
}
