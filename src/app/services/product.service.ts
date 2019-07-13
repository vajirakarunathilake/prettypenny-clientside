import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../products/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/products')
      .pipe( map( (p) => p as Product[]));
  }

  findAllStandard(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/products/standard')
      .pipe( map( (p) => p as Product[]));
  }

  findAllSale(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/products/on_sale')
      .pipe( map( (p) => p as Product[]));
  }

  findAllInterest(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/product/interests')
      .pipe( map( (p) => p as Product[]));
  }

  findById(productId: number): Observable<Product> {
    return this.http.get(`http://localhost:8080/project2/product?product_id=${productId}`)
      .pipe( map( (p) => p as Product));
  }

  insert(productName: string, productPrice: number, id: number): Observable<Product> {
    return this.http.post('http://localhost:8080/project2/product', {},{params: {name: productName, price: productPrice, seller_id: id}})
      .pipe( map( (p) => p as Product));
  }

  update(productName: string, productPrice: number, salePrice: number, prodStatus: string, id: number): Observable<Product> {
    return this.http.put('http://localhost:8080/project2/product', {},{params: {name: productName, price: productPrice, sale_price: salePrice, status: prodStatus, product_id: id}})
      .pipe( map( (p) => p as Product));
  }

  delete(productId: number){
    return this.http.delete(`http://localhost:8080/project2/product?product_id=${productId}`);
  }


}
