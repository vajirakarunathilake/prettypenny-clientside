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
    return this.http.get('http://localhost:8080/project2/api/products')
      .pipe( map( (p) => p as Product[]));
  }

  findAllStandard(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/api/products/standard')
      .pipe( map( (p) => p as Product[]));
  }

  findAllSale(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/api/products/on_sale')
      .pipe( map( (p) => p as Product[]));
  }

  findAllInterest(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/project2/api/product/interests')
      .pipe( map( (p) => p as Product[]));
  }

  findById(productId: number): Observable<Product> {
    return this.http.get(`http://localhost:8080/project2/api/product?productId=${productId}`)
      .pipe( map( (p) => p as Product));
  }

  insert(productName: string, productPrice: number, id: number, interestThreshold: number, image: string): Observable<Product> {
    return this.http.post('http://localhost:8080/project2/api/product', {"name": productName, "price": productPrice, "userId": id, "interestThreshold": interestThreshold, "imageUrl": image})
      .pipe( map( (p) => p as Product));
  }

  update(productName: string, productPrice: number, salePrice: number, prodStatus: string, id: number, interestThreshold: number,image: string): Observable<Product> {
    return this.http.put('http://localhost:8080/project2/api/product', {"name": productName, "price": productPrice, "salePrice": salePrice, "status": prodStatus, "productId": id,"interestThreshold": interestThreshold, "imageUrl": image})
      .pipe( map( (p) => p as Product));
  }

  delete(productId: number){
    return this.http.delete(`http://localhost:8080/project2/api/product?productId=${productId}`);
  }


}
