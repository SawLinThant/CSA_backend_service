import type { Address } from '../../../domain/addresses/Address';
import type { AddressCreateData, AddressRepository, AddressUpdateData } from '../../../domain/addresses/AddressRepository';
export declare class PrismaAddressRepository implements AddressRepository {
    listByUserId(userId: string): Promise<Address[]>;
    findById(id: string): Promise<Address | null>;
    findByIdAndUserId(id: string, userId: string): Promise<Address | null>;
    createForUser(userId: string, data: AddressCreateData): Promise<Address>;
    updateForUser(id: string, userId: string, data: AddressUpdateData): Promise<Address>;
    deleteForUser(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=PrismaAddressRepository.d.ts.map