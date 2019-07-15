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
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/products')
      .pipe( map( (p) => p as Product[]));
  }

  findAllStandard(): Observable<Product[]> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/products/standard')
      .pipe( map( (p) => p as Product[]));
  }

  findAllSale(): Observable<Product[]> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/products/on_sale')
      .pipe( map( (p) => p as Product[]));
  }

  findAllInterest(): Observable<Product[]> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/product/interests')
      .pipe( map( (p) => p as Product[]));
  }

  findById(productId: number): Observable<Product> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/product?productId=${productId}`)
      .pipe( map( (p) => p as Product));
  }

  insert(productName: string, productPrice: number, id: number, interestThreshold: number, image: string): Observable<any> {
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/product',
     {name: productName, price: productPrice, userId: id, interestThreshold: interestThreshold, imageUrl: image})
    .pipe( map( (response: any) => response));
  }

  update(productName: string, productPrice: number, salePrice: number, prodStatus: string, id: number, interestThreshold: number,image: string): Observable<any> {
    return this.http.put('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/product',
     {name: productName, price: productPrice, salePrice: salePrice, status: prodStatus, productId: id, interestThreshold: interestThreshold, imageUrl: image})
    .pipe( map( (response: any) => response));
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/product?productId=${productId}`)
    .pipe( map( (response: any) => response));
  }


}
