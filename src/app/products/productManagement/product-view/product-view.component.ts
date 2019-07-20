import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';
import { environment } from 'src/environments/environment';
import { Product } from '../../product';
import { Helpers } from './../../../helpers';
import { ProductService } from './../../../services/product.service';
import { Taxonomy } from './../../taxonomy';
import { HttpHeaders } from '@angular/common/http';

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
  viewAlertClass: string;
  viewAlertShow = false;
  viewAlertContent: string;
  editAlertClass: string;
  editAlertShow = false;
  editAlertContent: string;
  editcardShow = false;
  quantityLabel = `Quantity`;
  listType: number;
  resp: string;
  editHeaderClass: string;
  brands = environment.brands;
  categories = environment.categories;
  subCategories = environment.subCategories;
  product: Product = new Product();
  taxonomy: Taxonomy = new Taxonomy();


  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {

    this.user.userId = Number(this.helper.localStorageItem('userId'));
    this.viewAlertShow = true;
    this.viewAlertClass = 'alert alert-info';
    this.viewAlertContent = 'No active listings in your account.';
    this.getProducts();
  }

  getProducts() {
    this.productService.findPrettiesBySeller(this.user).subscribe(
      (p) => {
        this.prettyProducts = p;
        if (+this.prettyProducts.length !== 0) {
          this.prettyShow = true;
          this.viewAlertShow = false;
        }
      });

    this.productService.findPenniesBySeller(this.user).subscribe(
      (p) => {
        this.pennyProducts = p;
        if (+this.pennyProducts.length !== 0) {
          this.pennyShow = true;
          this.viewAlertShow = false;
        }

      });
  }

  prettyEdit(product: Product) {

    this.product = product;
    this.taxonomy = this.product.taxonomy;
    this.prettyShow = false;
    this.pennyShow = false;
    this.editHeaderClass = 'card-header text-white bg-secondary';
    this.editcardShow = true;
  }
  pennyEdit(product: Product) {

    this.product = product;
    this.taxonomy = this.product.taxonomy;
    this.prettyShow = false;
    this.pennyShow = false;
    this.editHeaderClass = 'card-header text-white bg-warning';
    this.editcardShow = true;
  }

  updateProduct(editProductForm: NgForm) {

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
    this.product.dateListed = null;
    this.productService.update(this.product).subscribe(
      (response) => {
        this.resp = response;
        console.log(response);
        if (this.resp + '' !== '-1') {
          this.editcardShow = false;
          editProductForm.resetForm();
          this.editAlertShow = false;
          this.viewAlertShow = true;
          this.viewAlertClass = 'alert alert-success';
          this.viewAlertContent = 'Successfully Added.';
          this.product = new Product();
          this.getProducts();
        } else {
          this.editAlertShow = true;
          this.viewAlertShow = false;
          this.editAlertClass = 'alert alert-danger';
          this.editAlertContent = 'Please enter all relevant information.';
        }
      });
  }

  canceledit() {
    this.editAlertShow = false;
    this.viewAlertShow = false;
    this.editcardShow = false;
    this.prettyShow = true;
    this.pennyShow = true;
  }

  changeLabel() {
    if (+this.listType === 0) {
      this.quantityLabel = 'Quantity';
    } else if (+this.listType === 1) {
      this.quantityLabel = 'Minimum Threshold Value';
    }
  }

}
