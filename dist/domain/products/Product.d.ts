export interface ProductImage {
    id: string;
    imageUrl: string;
    isPrimary: boolean;
    sortOrder: number;
}
export interface Product {
    id: string;
    farmerId: string;
    categoryId: string;
    name: string;
    description: string | null;
    unit: string;
    basePrice: number;
    isActive: boolean;
    createdAt: Date;
    images?: ProductImage[];
}
export interface ProductImageCreateInput {
    imageUrl: string;
    isPrimary?: boolean;
    sortOrder?: number;
}
//# sourceMappingURL=Product.d.ts.map