import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';

export class AdminGetCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(customerId: string) {
    const customerWithUser = await this.customerRepository.getByIdWithUser(customerId);
    if (!customerWithUser) throw new Error('Customer not found');

    return {
      id: customerWithUser.id,
      userId: customerWithUser.userId,
      createdAt: customerWithUser.createdAt,
      user: {
        id: customerWithUser.user.id,
        name: customerWithUser.user.name,
        email: customerWithUser.user.email,
        phone: customerWithUser.user.phone,
        role: customerWithUser.user.role,
        status: customerWithUser.user.status,
      },
    };
  }
}
