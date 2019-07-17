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
      .pipe(map((p) => p as Product[]));
  }

  findAllStandard(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/products/pretty`)
      .pipe(map((p) => p as Product[]));
  }

  findAllSale(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/products/on_sale`)
      .pipe(map((p) => p as Product[]));
  }

  findAllInterest(): Observable<Product[]> {
    return this.http.get(`${environment.apiBase}/product/penny`)
      .pipe(map((p) => p as Product[]));
  }

  findById(productId: number): Observable<Product> {
    return this.http.get(`${environment.apiBase}/product?productId=${productId}`)
      .pipe(map((p) => p as Product));
  }


  insert(productName: string, productPrice: number, id: number, interestThreshold: number,
     image: string, description: string, taxonomy: number): Observable<any> {
      let sendObj = new Product();
      sendObj.ProductName = productName;
      sendObj.price = productPrice;
      sendObj.interestThreshold = interestThreshold;
      sendObj.userId = id;
      sendObj.imageUrl = image;
      sendObj.description = description;
      sendObj.taxonomy = taxonomy;
      return this.http.post(`${environment.apiBase}/product`, sendObj ).pipe(map((response: any) => response));
  }

  update(productName: string, productPrice: number, salePrice: number,
    prodStatus: string, id: number, interestThreshold: number, image: string,
     description: string, taxonomy: number, prodId: number): Observable<any> {
      let sendObj = new Product();
      sendObj.ProductName = productName;
      sendObj.price = productPrice;
      sendObj.interestThreshold = interestThreshold;
      sendObj.imageUrl = image;
      sendObj.description = description;
      sendObj.taxonomy = taxonomy;
      sendObj.salePrice = salePrice;
      sendObj.productId = prodId;
      sendObj.status = prodStatus;
      sendObj.userId = id;
      return this.http.put(`${environment.apiBase}/product`, sendObj)
      .pipe(map((response: any) => response));
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`${environment.apiBase}/product?productId=${productId}`)
      .pipe(map((response: any) => response));
  }


}
