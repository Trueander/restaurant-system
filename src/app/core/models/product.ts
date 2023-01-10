import { Category } from "./category";

export class Product {
    id!: string;
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    imageUrl!: string;
    createdAt!: string;
    active!: boolean;
    category!: Category;
    discount?: number;
}
