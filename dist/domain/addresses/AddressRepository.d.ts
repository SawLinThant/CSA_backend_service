import type { Address } from './Address';
export interface AddressCreateData {
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
}
export type AddressUpdateData = Partial<AddressCreateData>;
export interface AddressRepository {
    listByUserId(userId: string): Promise<Address[]>;
    findById(id: string): Promise<Address | null>;
    findByIdAndUserId(id: string, userId: string): Promise<Address | null>;
    createForUser(userId: string, data: AddressCreateData): Promise<Address>;
    updateForUser(id: string, userId: string, data: AddressUpdateData): Promise<Address>;
    deleteForUser(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=AddressRepository.d.ts.map