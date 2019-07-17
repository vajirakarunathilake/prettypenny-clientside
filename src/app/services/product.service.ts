import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../products/product';
import { User } from '../user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

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


  insert(sendObj: Product): Observable<any> {

      return this.http.post(`${environment.apiBase}/product`, sendObj ).pipe(map((response: any) => response));
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


}
