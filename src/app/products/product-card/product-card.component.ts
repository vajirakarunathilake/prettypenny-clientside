import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../../services/product.service';
import { Interest } from '../interest';
import { Helpers } from 'src/app/helpers';
import { Router } from '@angular/router';

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
  percentage: number;
  needthresholdtext: string;
  over: number;
  need: number;
  needClass: string;

  constructor(
    private prodService: ProductService,
    public helper: Helpers,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = this.helper.localStorageItem('email') != null;
    this.pretty = this.product.status === 'Pretty' ? true : false;
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
