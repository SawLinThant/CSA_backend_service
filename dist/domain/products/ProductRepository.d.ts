import type { Product, ProductImageCreateInput } from './Product';
export type ProductCreateData = Omit<Product, 'id' | 'createdAt' | 'images'>;
export type ProductUpdateData = Partial<Pick<Product, 'name' | 'description' | 'categoryId' | 'unit' | 'basePrice' | 'isActive'>>;
export interface ProductListByFarmerFilters {
    name?: string;
    categoryId?: string;
    isActive?: boolean;
}
/** Filters for public product listing (no farmer scope). */
export interface ProductListFilters {
    name?: string;
    categoryId?: string;
    isActive?: boolean;
}
export interface ProductRepository {
    findById(id: string): Promise<Product | null>;
    findByIdAndFarmerId(id: string, farmerId: string): Promise<Product | null>;
    list(skip: number, take: number, filters?: ProductListFilters): Promise<{
        items: Product[];
        total: number;
    }>;
    listByFarmerId(farmerId: string, skip: number, take: number, filters?: ProductListByFarmerFilters): Promise<{
        items: Product[];
        total: number;
    }>;
    create(data: ProductCreateData, images?: ProductImageCreateInput[]): Promise<Product>;
    update(id: string, data: ProductUpdateData, images?: ProductImageCreateInput[]): Promise<Product>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProductRepository.d.ts.map