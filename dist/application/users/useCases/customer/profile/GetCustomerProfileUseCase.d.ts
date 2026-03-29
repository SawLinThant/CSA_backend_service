import type { UserRepository } from '../../../../../domain/users/UserRepository';
export declare class GetCustomerProfileUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            imageUrl: string | null;
            role: "customer";
            createdAt: Date;
        };
    }>;
}
//# sourceMappingURL=GetCustomerProfileUseCase.d.ts.map