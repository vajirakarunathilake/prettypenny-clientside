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

  prettyProducts: Product[];
  pennieProducts: Product[];
  private user: User = new User();


  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {

    this.user.userId = Number(this.helper.localStorageItem('userId'));

    this.productService.findPrettiesBySeller(this.user).subscribe(
      (p) => {
        this.prettyProducts = p;
      });

    this.productService.findPenniesBySeller(this.user).subscribe(
      (p) => {
        this.pennieProducts = p;
      });

  }

}
