import { Product } from ',/product';
import { User } from './user';

export class Interest {
    id: number;
    user: User;
    product: Product;
    quantity: number;
    status: number;
}
