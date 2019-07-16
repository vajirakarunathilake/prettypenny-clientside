import { Router } from '@angular/router';
import { Helpers } from './../../../helpers';
import { Taxonomy } from './../../taxonomy';
import { Product } from './../../product';
import { ProductService } from './../../../services/product.service';
import { TaxonomyService } from './../../../services/taxonomy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product: Product = new Product();
  taxonomy: Taxonomy = new Taxonomy();
  quantityLabel: String = "Quantity";
  brandName: String;
  category: String;
  subCategory: String;
  listType: number;
  resp: string;
  responseStatus: boolean = null;
  brands = ['Apple', 'Samsung', 'Sony', 'Dell'];
  categories = ['Electronics', 'Cloths', 'Watches', 'Furnitures'];
  subCategories = ['TV', 'Phone', 'Shirts', 'Chairs'];

  constructor(private productService: ProductService, private taxonomyService: TaxonomyService, private router: Router, public helper: Helpers) { }

  ngOnInit() {

  }

  addProduct() {
    if (this.listType == 0) {
      if (this.product.price - this.product.onSale > 0) {
        this.product.status = "On Sale";
      } else {
        this.product.status = "Standard";
      }
    } else if (this.listType == 1) {
      this.product.status = "Within Threshold";
    }

    this.product.userId = 68;
    this.product.taxonomy = 54;
    this.productService.insertt(this.product).subscribe(
      (response) => {
        this.resp = response;
        console.log(this.resp);
        if (this.resp !== 'User Product Add Failed') {
          this.router.navigate(['/productmanagement']);
        }else{
          this.responseStatus = false;
        }
      });
  }

  changeLabel() {


    if (this.listType == 0) {
      this.quantityLabel = "Quantity";

    } else if (this.listType == 1) {
      this.quantityLabel = "Minimum Threshold Value";
    }
  }

  nameOnChange() {
    console.log(this.taxonomy.name);

  }

  typeOnChange() {
    console.log(this.taxonomy.type);

  }

  subTypeOnChange() {
    console.log(this.taxonomy.subType);

  }

}
