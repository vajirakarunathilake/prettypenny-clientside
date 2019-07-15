import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favorite } from '../products/favorite';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Favorite[]> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/favorites')
      .pipe( map( (f) => f as Favorite[]));
  }

  findByUser(userId: number): Observable<Favorite[]> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/by_user?userId=${userId}`)
      .pipe( map( (f) => f as Favorite[]));
  }

  findById(favoriteId: number): Observable<Favorite> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/favorite?favoriteId=${favoriteId}`)
      .pipe( map( (f) => f as Favorite));
  }

  insert(custId: number, prodId: number): Observable<any> {
    return this.http.post(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/favorite`,
    {userId: custId, productId: prodId})
    .pipe( map( (response: any) => response));
  }

  update(favoriteId: number, custId: number, prodId: number): Observable<any> {
    return this.http.put(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/favorite`,
    {favoriteId: favoriteId, userId: custId, productId: prodId})
    .pipe( map( (response: any) => response));
  }

  delete(favoriteId: number): Observable<any> {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/favorite?favoriteId=${favoriteId}`)
    .pipe( map( (response: any) => response));
  }
//backup
//,{},{params: {favorite_id: favoriteId, customer_id: custId, product_id: prodId}}



}
