import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Helpers } from '../helpers';
import { Interest } from '../products/interest';
import { Product } from '../products/product';
import { ToastyNotificationsService } from './toasty-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  cartAdditionEmitter = new EventEmitter<Product[]>(); // emitted for card and single product, minicart listens to it
  cartTotalEmitter = new EventEmitter<number>(); // emitted for price total calculation on, addition, substraction, increase or removal
  filterTypeEmitter = new EventEmitter<string>(); // emittet when filtering through product categories
  searchEmitter = new EventEmitter<string>();
  layoutModeEmitter = new EventEmitter<boolean>();

  private allProducts: Product[];
  private cartAddedProducts: Product[] = [];
  private cartTotal = 0;
  private selectedProduct: Product;
  private filterBy = 'all';
  private search = '';
  private layoutMode = window.localStorage.getItem('ngShopLayout') === 'list' ? false : true;


  constructor(
    private router: Router,
    private toastyNotifications: ToastyNotificationsService,
    private http: HttpClient,
    private helper: Helpers
    ) { }

  findAll(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/products`)
      .pipe(
        map((p) => p as Product[])
      );
  }

  findAllStandard(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/products/pretty`)
      .pipe(
        map((p) => p as Product[])
      );
  }

  findAllSale(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/products/on_sale`)
      .pipe(
        map((p) => p as Product[])
      );
  }

  findAllInterest(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/product/penny`)
      .pipe(
        map((p) => p as Product[])
      );
  }

  findById(productId: number): Observable<Product> {
    return this.http.get(`${environment.apiBase}/product?productId=${productId}`)
      .pipe(
        map((p) => p as Product)
      );
  }

  findPrettiesBySeller(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/pretty/by_seller?sellerId=${this.helper.localStorageItem("userId")}`)
      .pipe(map((p) => p as Product[]));
  }

  findPenniesBySeller(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/pennies/by_seller?sellerId=${this.helper.localStorageItem("userId")}`)
      .pipe(map((p) => p as Product[]));
  }

  insert(product: Product): Observable<any> {
    console.log(JSON.stringify(product));
    return this.http.post(`${environment.apiBase}/product`, JSON.stringify(product), this.headers)
      .pipe(map((response: any) => response));
  }

  update(product: Product): Observable<any> {
    return this.http.put(`${environment.apiBase}/product`, product)
      .pipe(
        map((response: any) => response)
      );
  }

  delete(product: Product): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(product)
    };
    return this.http.delete(`${environment.apiBase}/product`, options)
      .pipe(
        map((response: any) => response)
      );
  }

  setFilter(filterValue: string) {
    this.filterBy = filterValue;
    this.filterTypeEmitter.emit(this.filterBy);
  }
  getFilter() {
    return this.filterBy;
  }

  searchFilter(searchValue: string) {
    this.search = searchValue;
    this.searchEmitter.emit(this.search);
  }
  getSearchFilter() {
    return this.search;
  }


  setAllProducts(fetchedProducts: Product[]) {
    this.allProducts = fetchedProducts;
  }

  getAllProducts() {
    return this.allProducts.slice();
  }



  addToCart(product: Product, quantity: number) {
    // if item is already in cart ++ its qty, don't read it
    const added = this.cartAddedProducts.find(p => p === product);
    const interest = new Interest();
    interest.quantity = quantity;
    added ? added.generatedInterest += interest.quantity : this.cartAddedProducts.push(product);
    this.cartAdditionEmitter.emit(this.cartAddedProducts);
    this.calculateCartTotal();
    this.cartTotalEmitter.emit(this.cartTotal);
    this.toastyNotifications.addToast(false, product.productName, true);
  }

  getCartAddedProducts() {
    return this.cartAddedProducts;
  }

  calculateCartTotal() {
    this.cartTotal = 0;
    this.cartAddedProducts.forEach(element => {
      this.cartTotal += element.price * element.generatedInterest;
    });
  }

  getCartTotal() {
    return this.cartTotal;
  }

  cartProductManipulate(product: Product, quantity: number = 0, increase: boolean = false) {
    const manipulatedProduct = this.cartAddedProducts.find(mp => mp === product);
    increase ? manipulatedProduct.generatedInterest += quantity : manipulatedProduct.generatedInterest -= quantity;
    this.calculateCartTotal();
    this.cartTotalEmitter.emit(this.cartTotal);
  }



  removeCartSingleItem(itemIndex: number) {
    // fixes a bug where multiple items are added to a cart if we cleared a cart when item had qty > 1
    this.cartAddedProducts[itemIndex].generatedInterest = 1;

    const removedProductName = this.cartAddedProducts[itemIndex].productName;
    this.cartAddedProducts.splice(itemIndex, 1);
    this.cartAdditionEmitter.emit(this.cartAddedProducts);
    this.calculateCartTotal();
    this.cartTotalEmitter.emit(this.cartTotal);
    this.toastyNotifications.addToast(false, removedProductName, false);
  }

  emptyCart() {
    // fixes a bug where multiple items are added to a cart if we cleared a cart when item had qty > 1
    for (const cp of this.cartAddedProducts) { cp.generatedInterest = 1; }

    this.cartAddedProducts = [];
    this.cartAdditionEmitter.emit(this.cartAddedProducts);
    this.cartTotal = 0;
    this.cartTotalEmitter.emit(this.cartTotal);
    this.router.navigate(['/products']);
    this.toastyNotifications.addToast(true);
  }



  getLayout() {
    return this.layoutMode;
  }
  setLayout(layoutValue: boolean) {
    window.localStorage.setItem('ngShopLayout', layoutValue ? 'grid' : 'list');
    this.layoutMode = layoutValue;
    this.layoutModeEmitter.emit(this.layoutMode);
  }


}

