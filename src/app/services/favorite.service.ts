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
    return this.http.get('http://localhost:8080/project2/favorites')
      .pipe( map( (f) => f as Favorite[]));
  }

  findByUser(userId: number): Observable<Favorite[]> {
    return this.http.get(`http://localhost:8080/project2/favorites/by_user?customer_id=${userId}`)
      .pipe( map( (f) => f as Favorite[]));
  }

  findById(favoriteId: number): Observable<Favorite> {
    return this.http.get(`http://localhost:8080/project2/favorite?id=${favoriteId}`)
      .pipe( map( (f) => f as Favorite));
  }

  insert(custId: number, prodId: number): Observable<Favorite> {
    return this.http.post(`http://localhost:8080/project2/favorite`,{},{params: {customer_id: custId, product_id: prodId}})
      .pipe( map( (f) => f as Favorite));
  }

  update(favoriteId: number, custId: number, prodId: number): Observable<Favorite> {
    return this.http.put(`http://localhost:8080/project2/favorite`,{},{params: {favorite_id: favoriteId, customer_id: custId, product_id: prodId}})
      .pipe( map( (f) => f as Favorite));
  }

  delete(favoriteId: number){
    return this.http.delete(`http://localhost:8080/project2/favorite?favorite_id=${favoriteId}`);
  }
//backup
//,{},{params: {favorite_id: favoriteId, customer_id: custId, product_id: prodId}}



}
