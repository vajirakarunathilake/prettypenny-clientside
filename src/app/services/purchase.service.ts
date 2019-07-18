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
  constructor(private http: HttpClient) { }

  findAll(): Observable<Purchase[]> {
    return this.http.get(`${environment.apiBase}/purchases`)
      .pipe( map( (p) => p as Purchase[]));
  }


  findById(purchaseId: number): Observable<Purchase> {
    return this.http.get(`${environment.apiBase}/purchase?purchaseId=${purchaseId}`)
      .pipe( map( (p) => p as Purchase));
  }

  insert(purchase: Purchase): Observable<any> {
    return this.http.post(`${environment.apiBase}/purchase`,
     purchase)
     .pipe( map( (response: any) => response));
  }

  update(purchase: Purchase): Observable<any> {
    return this.http.put(`${environment.apiBase}/purchase`,
     purchase)
     .pipe( map( (response: any) => response));
  }

  delete(purchase: Purchase): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(purchase)
    };
    return this.http.delete(`${environment.apiBase}/purchase`, options)
    .pipe( map( (response: any) => response));
  }
}
