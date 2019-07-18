// import { Component, OnInit, DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../product';
import { Interest } from '../interest';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
// export class ProductComponent implements OnInit, DoCheck {
export class ProductComponent implements OnInit {
  id: string;
  product: Product;
  similarProducts: Product[];
  isLoading = true;
  quantity = 0;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductService
  ) { }

  ngOnInit() {
    this.initProductSingleView();
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
      },
      err => console.error(err),
      () => this.isLoading = false
    );
  }


  addToCart(product: Product) {
    this.prodService.addToCart(product, this.quantity);
  }


}
