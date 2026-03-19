import type { Product, ProductImageCreateInput } from '../../../domain/products/Product';
import type { ProductRepository, ProductCreateData, ProductUpdateData, ProductListByFarmerFilters, ProductListFilters } from '../../../domain/products/ProductRepository';
export declare class PrismaProductRepository implements ProductRepository {
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
//# sourceMappingURL=PrismaProductRepository.d.ts.map