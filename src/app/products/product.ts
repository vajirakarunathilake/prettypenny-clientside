import { Taxonomy } from './taxonomy';
import { User } from '../user';
export class Product {
  id: number;
  productName: string;
  price: number;
  salePrice: number;
  onSale: number;
  dateListed: Date;
  status: string;
  user: User;
  interestThreshold: number;
  imageUrl: string;
  description: string;
  taxonomy: Taxonomy;
}
