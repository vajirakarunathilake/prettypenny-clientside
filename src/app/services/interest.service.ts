import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Interest } from '../products/interest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Interest[]> {
    return this.http.get('http://localhost:8080/project2/api/interests')
      .pipe( map( (t) => t as Interest[]));
  }


  findById(interestId: number): Observable<Interest> {
    return this.http.get(`http://localhost:8080/project2/api/interest?interestId=${interestId}`)
      .pipe( map( (t) => t as Interest));
  }

  insert(uId: number, prodId: number, interestQuantity: number): any {
    return this.http.post('http://localhost:8080/project2/api/interest', {userId: uId, productId: prodId, quantity: interestQuantity})
    .pipe( map( (response: any) => response.json()));
  }

  update(uId: number, prodId: number, interestQuantity: number, id: number): any {
    return this.http.put('http://localhost:8080/project2/api/interest', {userId: uId, productId: prodId, quantity: interestQuantity, interestId: id})
    .pipe( map( (response: any) => response.json()));
  }

  delete(interestId: number): any {
    return this.http.delete(`http://localhost:8080/project2/api/interest?interestId=${interestId}`)
    .pipe( map( (response: any) => response.json()));
  }
}
