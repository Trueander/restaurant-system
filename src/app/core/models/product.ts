import { Category } from "./category";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    imageUrl!: string;
    createdAt!: string;
    isActive!: boolean;
    category!: Category;
    discount?: number;
}
