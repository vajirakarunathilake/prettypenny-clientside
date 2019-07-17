import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  prettyProducts : Product[];
  pennieProducts : Product[];


  constructor(private productService : ProductService) { }

  ngOnInit() {

    this.productService.findPrettiesBySeller().subscribe(
      (p) => {
        this.prettyProducts = p;
      });

      this.productService.findPenniesBySeller().subscribe(
        (p) => {
          this.pennieProducts = p;
        });

  }

}
