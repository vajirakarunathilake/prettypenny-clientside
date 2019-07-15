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
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/interests')
      .pipe( map( (t) => t as Interest[]));
  }


  findById(interestId: number): Observable<Interest> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/interest?interestId=${interestId}`)
      .pipe( map( (t) => t as Interest));
  }

  insert(uId: number, prodId: number, interestQuantity: number): Observable<any> {
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/interest', {userId: uId, productId: prodId, quantity: interestQuantity})
    .pipe( map( (response: any) => response));
  }

  update(uId: number, prodId: number, interestQuantity: number, id: number): Observable<any> {
    return this.http.put('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/interest', {userId: uId, productId: prodId, quantity: interestQuantity, interestId: id})
    .pipe( map( (response: any) => response));
  }

  delete(interestId: number): Observable<any> {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/interest?interestId=${interestId}`)
    .pipe( map( (response: any) => response));
  }
}
