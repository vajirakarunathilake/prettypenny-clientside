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
    return this.http.get('http://localhost:8080/project2/api/favorites')
      .pipe( map( (f) => f as Favorite[]));
  }

  findByUser(userId: number): Observable<Favorite[]> {
    return this.http.get(`http://localhost:8080/project2/favorites/api/by_user?userId=${userId}`)
      .pipe( map( (f) => f as Favorite[]));
  }

  findById(favoriteId: number): Observable<Favorite> {
    return this.http.get(`http://localhost:8080/project2/api/favorite?favoriteId=${favoriteId}`)
      .pipe( map( (f) => f as Favorite));
  }

  insert(custId: number, prodId: number): any {
    return this.http.post(`http://localhost:8080/project2/api/favorite`,
    {userId: custId, productId: prodId})
    .pipe( map( (response: any) => response.json()));
  }

  update(favoriteId: number, custId: number, prodId: number): any {
    return this.http.put(`http://localhost:8080/project2/api/favorite`,
    {favoriteId: favoriteId, userId: custId, productId: prodId})
    .pipe( map( (response: any) => response.json()));
  }

  delete(favoriteId: number): any {
    return this.http.delete(`http://localhost:8080/project2/api/favorite?favoriteId=${favoriteId}`)
    .pipe( map( (response: any) => response.json()));
  }
//backup
//,{},{params: {favorite_id: favoriteId, customer_id: custId, product_id: prodId}}



}
