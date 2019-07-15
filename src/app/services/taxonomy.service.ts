import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Taxonomy } from '../products/taxonomy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Taxonomy[]> {
    return this.http.get(`${environment.apiBase}/taxonomies`)
      .pipe( map( (t) => t as Taxonomy[]));
  }


  findById(taxonomyId: number): Observable<Taxonomy> {
    return this.http.get(`${environment.apiBase}/taxonomy?taxonomyId=${taxonomyId}`)
      .pipe( map( (t) => t as Taxonomy));
  }

  insert(taxonomyName: string, taxType: string, subTypee: string, prodId: number): Observable<any> {
    return this.http.post(`${environment.apiBase}/taxonomy`,
     {name: taxonomyName, type: taxType, subType: subTypee, productId: prodId})
     .pipe( map( (response: any) => response));
  }

  update(taxonomyName: string, taxType: string, subTypee: string, prodId: number, id: number): Observable<any> {
    return this.http.put(`${environment.apiBase}/taxonomy`,
     {name: taxonomyName, type: taxType, subType: subTypee, productId: prodId, taxonomyId: id})
     .pipe( map( (response: any) => response));
  }

  delete(taxonomyId: number): Observable<any> {
    return this.http.delete(`${environment.apiBase}/taxonomy?taxonomyId=${taxonomyId}`)
    .pipe( map( (response: any) => response));
  }
}
