import { User } from '../user';
import { Product } from './product';
import { LocalDate } from '../local-date';

export class Purchase {
    purchaseId: number;
    datePurchased: LocalDate;
    user: User;
    product: Product;
    cost: number;
}
