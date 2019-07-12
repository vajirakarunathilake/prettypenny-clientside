import { User } from "../user";
import { Product } from "./product";

export class Purchase {
    id: number;
    datePurchased: Date;
    user: User;
    product: Product;
}
