import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { ListCustomersQuery } from '../../../dtos/userDtos';

function toPublicUser(user: {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  role: string;
  status: 'active' | 'suspended';
}) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status };
}

export class AdminListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: ListCustomersQuery) {
    const skip = (query.page - 1) * query.limit;
    const filters =
      query.name ?? query.phone ?? query.usertype
        ? {
            ...(query.name && { name: query.name }),
            ...(query.phone && { phone: query.phone }),
            ...(query.usertype && { role: query.usertype }),
          }
        : undefined;
    const { items, total } = await this.customerRepository.listWithUser(skip, query.limit, filters);

    return {
      items: items.map((c) => ({
        id: c.id,
        userId: c.userId,
        createdAt: c.createdAt,
        user: toPublicUser(c.user),
      })),
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
