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
    return this.http.get('http://localhost:8080/project2/api/purchases')
      .pipe( map( (p) => p as Purchase[]));
  }


  findById(purchaseId: number): Observable<Purchase> {
    return this.http.get(`http://localhost:8080/project2/api/purchase?purchaseId=${purchaseId}`)
      .pipe( map( (p) => p as Purchase));
  }

  insert(purchaseDate: Date, userId: number, productId: number): Observable<Purchase> {
    return this.http.post('http://localhost:8080/project2/api/purchase', {"datePurchased": purchaseDate, "userId": userId, "productId": productId})
      .pipe( map( (p) => p as Purchase));
  }

  update(purchaseDate: Date, userId: number, productId: number, purchaseId: number): Observable<Purchase> {
    return this.http.put('http://localhost:8080/project2/api/purchase', {"datePurchased": purchaseDate, "userId": userId, "productId": productId, "purchaseId": purchaseId})
      .pipe( map( (p) => p as Purchase));
  }

  delete(purchaseId: number){
    return this.http.delete(`http://localhost:8080/project2/api/purchase?purchaseId=${purchaseId}`);
  }
}
