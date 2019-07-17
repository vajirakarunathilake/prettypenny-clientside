import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from '../products/purchase';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Product } from '../products/product';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,) { }

  findAll(): Observable<Purchase[]> {
    return this.http.get(`${environment.apiBase}/purchases`)
      .pipe( map( (p) => p as Purchase[]));
  }


  findById(purchaseId: number): Observable<Purchase> {
    return this.http.get(`${environment.apiBase}/purchase?purchaseId=${purchaseId}`)
      .pipe( map( (p) => p as Purchase));
  }

  insert(purchaseDate: Date, uId: number, prodId: number): Observable<any> {
    let user = new User();
    let product = new Product();
    user.userId = uId;
    product.productId = prodId;
    let purchase = new Purchase();
    purchase.datePurchased = purchaseDate;
    purchase.user = user;
    purchase.product = product;
    return this.http.post(`${environment.apiBase}/purchase`,
     purchase)
     .pipe( map( (response: any) => response));
  }

  update(purchaseDate: Date, uId: number, prodId: number, purchId: number): Observable<any> {
    let user = new User();
    let product = new Product();
    user.userId = uId;
    product.productId = prodId;
    let purchase = new Purchase();
    purchase.datePurchased = purchaseDate;
    purchase.user = user;
    purchase.product = product;
    purchase.purchaseId = purchId;
    return this.http.put(`${environment.apiBase}/purchase`,
     purchase)
     .pipe( map( (response: any) => response));
  }

  delete(purchaseId: number): Observable<any> {
    return this.http.delete(`${environment.apiBase}/purchase?purchaseId=${purchaseId}`)
    .pipe( map( (response: any) => response));
  }
}
