import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Interest } from '../products/interest';
import { Product } from '../products/product';
import { User } from '../user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Interest[]> {
    return this.http.get(`${environment.apiBase}/interests`)
      .pipe( map( (t) => t as Interest[]));
  }


  findById(interestId: number): Observable<Interest> {
    return this.http.get(`${environment.apiBase}/interest?interestId=${interestId}`)
      .pipe( map( (t) => t as Interest));
  }

  insert(uId: number, prodId: number, interestQuantity: number): Observable<any> {
    let interest = new Interest();
    interest.quantity = interestQuantity;
    let user = new User();
    let product = new Product();
    user.userId = uId;
    product.productId = prodId;
    return this.http.post(`${environment.apiBase}/interest`, interest)
    .pipe( map( (response: any) => response));
  }

  update(uId: number, prodId: number, interestQuantity: number, id: number): Observable<any> {
    let interest = new Interest();
    interest.quantity = interestQuantity;
    let user = new User();
    let product = new Product();
    user.userId = uId;
    product.productId = prodId;
    interest.id = id;
    return this.http.put(`${environment.apiBase}/interest`, interest)
    .pipe( map( (response: any) => response));
  }

  delete(interestId: number): Observable<any> {
    return this.http.delete(`${environment.apiBase}/interest?interestId=${interestId}`)
    .pipe( map( (response: any) => response));
  }
}
