import type { UserRepository } from '../../../../../domain/users/UserRepository';
export declare class AdminToggleUserStatusUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(targetUserId: string, actorAdminUserId: string): Promise<import("../../../../../domain/users/User").User>;
}
//# sourceMappingURL=AdminToggleUserStatusUseCase.d.ts.map