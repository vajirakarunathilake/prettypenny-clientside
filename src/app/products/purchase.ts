import { User } from "../user";
import { Product } from "./product";

export class Purchase {
    purchaseId: number;
    datePurchased: Date;
    user: User;
    product: Product;
}
