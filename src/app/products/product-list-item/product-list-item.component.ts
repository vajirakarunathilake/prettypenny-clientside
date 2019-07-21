import { Component, Input, OnInit } from '@angular/core';
import { Helpers } from 'src/app/helpers';
import { InterestService } from 'src/app/services/interest.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Input() layoutMode: boolean;
  quantity = 1;
  pretty = false;
  interestRatio = 0;
  percentage: number;
  needthresholdtext: string;
  over: number;
  need: number;
  needClass: string;
  save: number;

  constructor(
    private prodService: ProductService,
    private interestService: InterestService,
    public helper: Helpers,
    private router: Router
  ) { }

  ngOnInit() {
    this.pretty = this.product.status === 'Pretty';
    this.save = this.product.price - this.product.salePrice;
    this.percentage = (this.product.generatedInterest / this.product.interestThreshold) * 100;
    if (this.percentage > 100) {
      this.needClass = 'text-primary';
      this.over = this.product.generatedInterest - this.product.interestThreshold;
      this.needthresholdtext = 'Over ' + this.over + ' Sold';
    } else {
      this.needClass = 'text-danger';
      this.need = this.product.interestThreshold - this.product.generatedInterest;
      this.needthresholdtext = 'Need: ' + this.need;
    }
  }

  onValAdd() {
    this.quantity++;
  }

  onValSub() {
    this.quantity--;
  }

  onAddToCart(product: Product) {
    if (this.helper.localStorageItem('role') != null) {
      this.prodService.addToCart(product, this.quantity);
    } else {
      this.prodService.addToCart(product, this.quantity);
      this.router.navigate(['/login']);
    }
  }
}
