import { User } from '../user';
export class Product {
  productId: number;
  productName: string;
  price: number;
  salePrice: number;
  onSale: number;
  dateListed: Date;
  status: string;
  userId: number;
  interestThreshold: number;
  imageUrl: string;
  description: string;
  taxonomy: number
}
