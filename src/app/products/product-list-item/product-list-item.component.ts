import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../product';
import { Helpers } from 'src/app/helpers';
import { InterestService } from 'src/app/services/interest.service';


@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Input() layoutMode: boolean;
  quantity = 1;
  loggedIn = false;
  pretty = false;

  constructor(
    private prodService: ProductService,
    private interestService: InterestService,
    public helper: Helpers
    ) { }

  ngOnInit() {
    this.loggedIn = this.helper.localStorageItem('email') != null;
    this.pretty = this.product.status === 'Pretty' ? true : false;
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
