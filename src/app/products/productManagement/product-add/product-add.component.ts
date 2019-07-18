import { Helpers } from './../../../helpers';
import { Taxonomy } from './../../taxonomy';
import { Product } from './../../product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product: Product = new Product();
  taxonomy: Taxonomy = new Taxonomy();
  user: User = new User();
  quantityLabel = `Quantity`;
  listType: number;
  resp: string;
  brands = ['Apple', 'Samsung', 'Sony', 'Dell'];
  categories = ['Electronics', 'Cloths', 'Watches', 'Furnitures'];
  subCategories = ['TV', 'Phone', 'Shirts', 'Chairs'];
  alertClass: string;
  alertShow: boolean = false;
  alertContent: string;

  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {}

  addProduct(addProductForm: NgForm) {
    if (this.listType == 0) {
      this.product.status = "Pretty";
      this.product.onSale = 1;
    } else {
      this.product.status = "Within Threshold";
      this.product.onSale = 0;
    }

    console.log(this.helper.localStorageItem("userId"));

    // this.user.userId = Number(this.helper.localStorageItem("userId"));
    this.user.userId = 110;
    this.product.user = this.user;
    this.product.taxonomy = this.taxonomy;

    this.productService.insert(this.product).subscribe(
      (response) => {
        this.resp = response;
        
        if (this.resp != '-1') {
          this.alertShow = true;
          this.alertClass = 'alert alert-success';
          this.alertContent = 'Successfullt Added.';
          addProductForm.onReset();
        } else {
          this.alertShow = true;
          this.alertClass = 'alert alert-danger';
          this.alertContent = 'Wrong Informations. Please check it again.';
          addProductForm.onReset();
        }
      });
  }

  changeLabel() {
    if (this.listType == 0) {
      this.quantityLabel = 'Quantity';
    } else if (this.listType == 1) {
      this.quantityLabel = 'Minimum Threshold Value';
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
