import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Taxonomy } from '../products/taxonomy';
import { Observable } from 'rxjs';
import { Product } from '../products/product';
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

  insert(taxonomy: Taxonomy): Observable<any> {
    return this.http.post(`${environment.apiBase}/taxonomy`, taxonomy)
     .pipe( map( (response: any) => response));
  }

  update(taxonomy: Taxonomy): Observable<any> {

    return this.http.put(`${environment.apiBase}/taxonomy`, taxonomy)
     .pipe( map( (response: any) => response));
  }

  delete(taxonomy: Taxonomy): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(taxonomy)
    };
    return this.http.delete(`${environment.apiBase}/taxonomy`, options)
    .pipe( map( (response: any) => response));
  }
}
