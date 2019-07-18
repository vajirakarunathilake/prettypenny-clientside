import { Helpers } from './../../../helpers';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { User } from 'src/app/user';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  prettyProducts: Product[] = [];
  pennyProducts: Product[] = [];
  private user: User = new User();
  prettyShow = false;
  pennyShow = false;
  alertClass: string;
  alertShow = false;
  alertContent: string;

  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {

    this.user.userId = Number(this.helper.localStorageItem('userId'));
    this.alertShow = true;
    this.alertClass = 'alert alert-info';
    this.alertContent = 'No active listings in your account.';

    this.productService.findPrettiesBySeller(this.user).subscribe(
      (p) => {
        this.prettyProducts = p;
        if (+this.prettyProducts.length !== 0) {
          this.prettyShow = true;
          this.alertShow = false;
        }
      });

    this.productService.findPenniesBySeller(this.user).subscribe(
      (p) => {
        this.pennyProducts = p;
        if (+this.pennyProducts.length !== 0) {
          this.pennyShow = true;
          this.alertShow = false;
        }

      });

  }

}
