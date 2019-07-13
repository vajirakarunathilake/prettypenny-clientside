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

  insert(userId: number, productId: number, interestQuantity: number): Observable<Interest> {
    return this.http.post('http://localhost:8080/project2/api/interest', {"userId": userId, "productId": productId, "quantity": interestQuantity})
      .pipe( map( (t) => t as Interest));
  }

  update(userId: number, productId: number, interestQuantity: number, id: number): Observable<Interest> {
    return this.http.put('http://localhost:8080/project2/api/interest', {"userId": userId, "productId": productId, "quantity": interestQuantity, "interestId": id})
      .pipe( map( (t) => t as Interest));
  }

  delete(interestId: number){
    return this.http.delete(`http://localhost:8080/project2/api/interest?interestId=${interestId}`);
  }
}
