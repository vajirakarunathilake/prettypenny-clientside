import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favorite } from '../products/favorite';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';
import { Product } from '../products/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Favorite[]> {
    return this.http.get(`${environment.apiBase}/favorites`)
      .pipe( map( (f) => f as Favorite[]));
  }

  findByUser(userId: number): Observable<Favorite[]> {
    return this.http.get(`${environment.apiBase}/favorite/by_user?userId=${userId}`)
      .pipe( map( (f) => f as Favorite[]));
  }

  findById(favoriteId: number): Observable<Favorite> {
    return this.http.get(`${environment.apiBase}/favorite?favoriteId=${favoriteId}`)
      .pipe( map( (f) => f as Favorite));
  }

  insert(custId: number, prodId: number): Observable<any> {
    let fave = new Favorite();
    let cust = new User();
    let product = new Product();
    cust.userId = custId;
    product.productId = prodId;
    fave.user = cust;
    fave.product = product;
    return this.http.post(`${environment.apiBase}/favorite`, fave)
    .pipe( map( (response: any) => response));
  }

  update(favoriteId: number, custId: number, prodId: number): Observable<any> {
    let fave = new Favorite();
    let cust = new User();
    let product = new Product();
    fave.favoriteId = favoriteId;
    cust.userId = custId;
    product.productId = prodId;
    fave.user = cust;
    fave.product = product;
    return this.http.put(`${environment.apiBase}/favorite`, fave)
    .pipe( map( (response: any) => response));
  }

  delete(favoriteId: number): Observable<any> {
    let fave = new Favorite();
    fave.favoriteId = favoriteId;
    return this.http.delete(`${environment.apiBase}/favorite?favoriteId=${favoriteId}`)
    .pipe( map( (response: any) => response));
  }
//backup
//,{},{params: {favorite_id: favoriteId, customer_id: custId, product_id: prodId}}



}
