import { Product } from './product';
import { User } from '../user';

export class Interest {
    interestId: number;
    user: User;
    product: Product;
    quantity: number;
}
