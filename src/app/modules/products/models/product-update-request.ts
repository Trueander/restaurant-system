export class ProductUpdateRequest {
    productId!: number;
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    isActive!: boolean;
    imageUrl!: string;
    discount!: number;
    categoryId!: number;
}
