import { Component, OnInit, Input } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../../services/product.service';
import { Interest } from '../interest';
import { Helpers } from 'src/app/helpers';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() interest: Interest;
  @Input() layoutMode: boolean;
  quantity = 1;
  loggedIn = false;
  pretty = false;
  precentage: number;

  constructor(
    private prodService: ProductService,
    public helper: Helpers
    ) { }

  ngOnInit() {
    this.loggedIn = this.helper.localStorageItem('email') != null;
    this.pretty = this.product.status === 'Pretty' ? true : false;
    this.precentage = (this.product.generatedInterest / this.product.interestThreshold) * 100;
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
