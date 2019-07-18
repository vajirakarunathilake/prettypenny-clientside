import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../product';


@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
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
