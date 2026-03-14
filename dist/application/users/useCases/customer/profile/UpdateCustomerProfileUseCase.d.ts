import type { UserRepository } from '../../../../../domain/users/UserRepository';
import type { UpdateCustomerProfileInput } from '../../../dtos/userDtos';
export declare class UpdateCustomerProfileUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: string, input: UpdateCustomerProfileInput): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        role: import("../../../../../domain/users/User").UserRole;
    }>;
}
//# sourceMappingURL=UpdateCustomerProfileUseCase.d.ts.map