import { Helpers } from './../../../helpers';
import { Taxonomy } from './../../taxonomy';
import { Product } from './../../product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  brands = environment.brands;
  categories = environment.categories;
  subCategories = environment.subCategories;
  alertClass: string;
  alertShow = false;
  alertContent: string;

  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() { }

  addProduct(addProductForm: NgForm) {
    if (+this.listType === 0) {
      this.product.status = 'Pretty';
      this.product.onSale = 1;
    } else {
      this.product.status = 'Within Threshold';
      this.product.onSale = 0;
    }

    this.user.userId = +this.helper.localStorageItem('userId');
    this.product.user = this.user;
    this.product.taxonomy = this.taxonomy;

    this.productService.insert(this.product).subscribe(
      (response) => {
        this.resp = response;

        if (this.resp + '' !== '-1') {
          this.alertShow = true;
          this.alertClass = 'alert alert-success';
          this.alertContent = 'Successfully Added.';
          addProductForm.onReset();
        } else {
          this.alertShow = true;
          this.alertClass = 'alert alert-danger';
          this.alertContent = 'Please enter all relevant information.';
        }
      });
  }

  changeLabel() {
    if (+this.listType === 0) {
      this.quantityLabel = 'Quantity';
    } else if (+this.listType === 1) {
      this.quantityLabel = 'Minimum Threshold Value';
    }
  }
}
