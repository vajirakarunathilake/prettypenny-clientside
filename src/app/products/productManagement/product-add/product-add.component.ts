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
  listType: string;
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
    if (this.listType + '' === 'Pretty') {
      this.product.status = 'Pretty';
      this.product.onSale = 1;
    }
    if (this.listType + '' === 'Penny') {
      this.product.status = 'Within Threshold';
      this.product.onSale = 0;
    }

    this.user.userId = +this.helper.localStorageItem('userId');
    this.product.user = this.user;

    if (this.product.productName === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Product Name cannot be empty.';
    } else if (this.taxonomy.name === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please Select Brand Name of your product';
    } else if (this.taxonomy.type === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please Select Category Name of your product';
    } else if (this.taxonomy.subType === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please Select Sub Categoty of your product';
    } else if (this.product.imageUrl === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Image URL cannot be empty.';
    } else if (this.product.description === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Product Description cannot be empty.';
    } else if (this.listType === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please select your List Type.';
    } else if (this.product.interestThreshold === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Quantity/ Threshold Value cannot be empty.';
    } else if (this.product.price === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Product Price cannot be empty.';
    } else if (this.product.salePrice === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Product Sale Price cannot be empty.';
    } else {
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
            this.alertContent = 'Wrong Informations. Please check it again.';
          }
        });
    }
  }

  changeLabel() {
    if (this.listType + '' === 'Pretty') {
      this.quantityLabel = 'Quantity';
    } else if (this.listType + '' === 'Penny') {
      this.quantityLabel = 'Minimum Threshold Value';
    }
  }
}
