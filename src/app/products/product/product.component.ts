// import { Component, OnInit, DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../product';
import { Helpers } from 'src/app/helpers';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
// export class ProductComponent implements OnInit, DoCheck {
export class ProductComponent implements OnInit {
  id: string;
  product: Product;
  similarProducts: Product[];
  isLoading = true;
  quantity = 1;
  loggedIn = false;
  pretty = false;
  percentage = 0;
  needthresholdtext: string;
  over: number;
  need: number;
  needClass: string;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {
    this.initProductSingleView();
    this.loggedIn = this.helper.localStorageItem('email') != null;

  }

  // ngDoCheck() {
  //   this.initProductSingleView();
  // }

  // helper fn to save repeating same code in init and doCheck hooks
  initProductSingleView() {
    this.id = this.route.snapshot.params['id'];
    this.prodService.findById(+this.id).subscribe(
      product => {
        this.product = product;
        this.pretty = this.product.status === 'Pretty';
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
      },
      err => console.error(err),
      () => this.isLoading = false
    );
  }

  onValAdd() {
    this.quantity++;
  }

  onValSub() {
    this.quantity--;
  }

  addToCart(product: Product) {
    this.prodService.addToCart(product, this.quantity);
  }


}
