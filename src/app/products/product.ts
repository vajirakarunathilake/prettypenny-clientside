import { User } from '../user';
export class Product {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  onSale: number;
  dateListed: Date;
  status: string;
  user: User;
}
