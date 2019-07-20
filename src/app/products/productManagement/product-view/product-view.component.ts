import { Taxonomy } from './../../taxonomy';
import { Helpers } from './../../../helpers';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { User } from 'src/app/user';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

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
  listType: string;
  resp: string;
  editHeaderClass: string;
  brands = environment.brands;
  categories = environment.categories;
  subCategories = environment.subCategories;
  product: Product = new Product();
  taxonomy: Taxonomy = new Taxonomy();
  previousListType: number;


  constructor(
    private productService: ProductService,
    public helper: Helpers
  ) { }

  ngOnInit() {

    this.user.userId = Number(this.helper.localStorageItem('userId'));
    this.viewAlertShow = true;
    this.viewAlertClass = 'alert alert-info';
    this.viewAlertContent = 'No active listings in your account.';

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

  prettyEdit(productId: number) {

    this.listType = 'Pretty';
    this.productService.findById(productId).subscribe(
      (p) => {
        this.product = p;
        this.taxonomy = this.product.taxonomy;
      });
    this.prettyShow = false;
    this.pennyShow = false;
    this.editHeaderClass = 'card-header text-white bg-secondary';
    this.editcardShow = true;
    this.previousListType = this.product.onSale;
  }
  pennyEdit(productId: number) {
    this.listType = 'Penny';
    this.productService.findById(productId).subscribe(
      (p) => {
        this.product = p;
        this.taxonomy = this.product.taxonomy;
      });
    this.prettyShow = false;
    this.pennyShow = false;
    this.editHeaderClass = 'card-header text-white bg-warning';
    this.editcardShow = true;
    this.previousListType = this.product.onSale;
  }

  updateProduct(editProductForm: NgForm) {

    if (this.listType + '' === 'Pretty') {
      if (+this.previousListType === 0) {
        this.product.status = 'Pretty';
        this.product.onSale = 1;
        this.product.generatedInterest = 0;
      }
    }
    if (this.listType + '' === 'Penny') {
      if (+this.previousListType === 1) {
        this.product.status = 'Within Threshold';
        this.product.onSale = 0;
        this.product.generatedInterest = 0;
      }
    }

    this.user.userId = Number(this.helper.localStorageItem('userId'));
    this.product.user = this.user;

    if (this.product.productName === null || this.product.productName === undefined || this.product.productName === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Product Name cannot be empty.';
    } else if (this.taxonomy.name === null || this.taxonomy.name === undefined || this.taxonomy.name === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Please Select Brand Name of your product';
    } else if (this.taxonomy.type === null || this.taxonomy.type === undefined || this.taxonomy.type === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Please Select Category Name of your product';
    } else if (this.taxonomy.subType === null || this.taxonomy.subType === undefined || this.taxonomy.subType === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Please Select Sub Categoty of your product';
    } else if (this.product.imageUrl === null || this.product.imageUrl === undefined || this.product.imageUrl === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Image URL cannot be empty.';
    } else if (this.product.description === null || this.product.description === undefined || this.product.description === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Product Description cannot be empty.';
    } else if (this.listType === null || this.listType === undefined || this.listType === '') {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Please select your List Type.';
      // tslint:disable-next-line: max-line-length
    } else if (this.product.interestThreshold === null || this.product.interestThreshold === undefined || this.product.interestThreshold === 0) {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Quantity/ Threshold Value cannot be empty.';
    } else if (this.product.price === null || this.product.price === undefined || this.product.price === 0) {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Product Price cannot be empty.';
    } else if (this.product.salePrice === null || this.product.salePrice === undefined || this.product.salePrice === 0) {
      this.editAlertShow = true;
      this.editAlertClass = 'alert alert-danger';
      this.editAlertContent = 'Product Sale Price cannot be empty.';
    } else {
      this.product.taxonomy = this.taxonomy;
      this.product.dateListed = null;

      this.productService.update(this.product).subscribe(
        (response) => {
          this.resp = response;
          if (this.resp === 'Product Updated') {
            this.editcardShow = false;
            editProductForm.resetForm();
            this.editAlertShow = false;
            this.viewAlertShow = true;
            this.viewAlertClass = 'alert alert-success';
            this.viewAlertContent = 'Successfully Added.';
            this.prettyShow = true;
            this.pennyShow = true;
            this.product = new Product();
          } else {
            this.editAlertShow = true;
            this.viewAlertShow = false;
            this.editAlertClass = 'alert alert-danger';
            this.editAlertContent = 'Wrong Informations. Please check it again.';
          }
        });
    }
  }

  canceledit() {
    this.editAlertShow = false;
    this.viewAlertShow = false;
    this.editcardShow = false;
    this.prettyShow = true;
    this.pennyShow = true;
  }

  changeLabel() {
    if (this.listType + '' === 'Pretty') {
      this.quantityLabel = 'Quantity';
    } else if (this.listType + '' === 'Penny') {
      this.quantityLabel = 'Minimum Threshold Value';
    }
  }

}
