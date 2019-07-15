import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from '../products/purchase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Purchase[]> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/purchases')
      .pipe( map( (p) => p as Purchase[]));
  }


  findById(purchaseId: number): Observable<Purchase> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/purchase?purchaseId=${purchaseId}`)
      .pipe( map( (p) => p as Purchase));
  }

  insert(purchaseDate: Date, userId: number, productId: number): any {
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/purchase',
     {"datePurchased": purchaseDate, "userId": userId, "productId": productId})
     .pipe( map( (response: any) => response.json()));
  }

  update(purchaseDate: Date, uId: number, prodId: number, purchId: number): any {
    return this.http.put('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/purchase',
     {datePurchased: purchaseDate, userId: uId, productId: prodId, purchaseId: purchId})
     .pipe( map( (response: any) => response.json()));
  }

  delete(purchaseId: number): any {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/purchase?purchaseId=${purchaseId}`)
    .pipe( map( (response: any) => response.json()));
  }
}
