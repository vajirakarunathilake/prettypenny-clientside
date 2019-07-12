import { User } from './user';
export class Product {
  id: number;
  productName: string;
  price: number;
  salePrice: number;
  onSale: number;
  dateListed: Date;
  status: string;
  seller: User;
}
