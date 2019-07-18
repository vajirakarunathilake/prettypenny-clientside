import { Component, OnInit, Input } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../../services/product.service';
import { Interest } from '../interest';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() interest: Interest;
  @Input() layoutMode: boolean;
  quantity = 1;

  constructor(private prodService: ProductService) { }

  ngOnInit() {
  }

  onValAdd() {
    this.quantity++;
  }

  onValSub() {
    this.quantity--;
  }

  onAddToCart(product: Product) {
    this.prodService.addToCart(product, this.quantity);
  }

}
