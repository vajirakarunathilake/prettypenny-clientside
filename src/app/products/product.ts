import { Taxonomy } from './taxonomy';
import { User } from '../user';
export class Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  salePrice: number;
  onSale: number;
  generatedInterest: number;
  imageUrl: string;
  dateListed: Date;
  status: string;
  interestThreshold: number;
  taxonomy: Taxonomy;
  user: User;
}
