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
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  userInterests: Interest[];
  constructor(private http: HttpClient) { }

  findAll(): Observable<Interest[]> {
    return this.http.get(`${environment.apiBase}/interests`)
      .pipe(
        map((t) => t as Interest[])
      );
  }

  findByProductId(productId: number): Observable<Interest[]> {
    return this.http.get(`${environment.apiBase}/interests?by_product=${productId}`)
      .pipe(
        map((t) => t as Interest[])
      );
  }

  findByUserId(userId: number): Observable<Interest[]> {
    return this.http.get(`${environment.apiBase}/interests?by_user=${userId}`)
      .pipe(
        map((t) => t as Interest[])
      );
  }

  findById(interestId: number): Observable<Interest> {
    return this.http.get(`${environment.apiBase}/interest?interestId=${interestId}`)
      .pipe(
        map((t) => t as Interest)
      );
  }

  insert(interest: Interest): Observable<any> {
    return this.http.post(`${environment.apiBase}/interest`, interest, {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text'})
      .pipe(
        map((response: any) => response)
      );
  }

  update(interest: Interest): Observable<any> {
    return this.http.put(`${environment.apiBase}/interest`, interest)
      .pipe(
        map((response: any) => response)
      );
  }


  delete(interest: Interest): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(interest)
    };
    return this.http.delete(`${environment.apiBase}/interest`, options)
      .pipe(map((response: any) => response));

  }
}
