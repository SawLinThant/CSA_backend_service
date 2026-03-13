import type { Product } from './Product';
export interface ProductRepository {
    findById(id: string): Promise<Product | null>;
    listActive(): Promise<Product[]>;
    create(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product>;
}
//# sourceMappingURL=ProductRepository.d.ts.map