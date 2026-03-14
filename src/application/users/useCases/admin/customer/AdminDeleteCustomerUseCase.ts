import type { CustomerRepository } from '../../../../../domain/customers/CustomerRepository';
import type { UserRepository } from '../../../../../domain/users/UserRepository';

export class AdminDeleteCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(customerId: string) {
    const customer = await this.customerRepository.getByIdWithUser(customerId);
    if (!customer) throw new Error('Customer not found');

    await this.userRepository.delete(customer.userId);
  }
}
