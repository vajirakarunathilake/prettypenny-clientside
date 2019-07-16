import { User } from '../user';
export class Product {
  productId: number;
  ProductName: string;
  price: number;
  salePrice: number;
  onSale: number;
  dateListed: Date;
  status: string;
  user: User;
  interestThreshold: number;
  imageUrl: string;
  description: string;
  taxonomy: number;
}
