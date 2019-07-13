import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Taxonomy } from '../products/taxonomy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Taxonomy[]> {
    return this.http.get('http://localhost:8080/project2/taxonomies')
      .pipe( map( (t) => t as Taxonomy[]));
  }


  findById(taxonomyId: number): Observable<Taxonomy> {
    return this.http.get(`http://localhost:8080/project2/taxonomy?taxonomy_id=${taxonomyId}`)
      .pipe( map( (t) => t as Taxonomy));
  }

  insert(taxonomyName: string, taxType: string, subType: string, productId: number): Observable<Taxonomy> {
    return this.http.post('http://localhost:8080/project2/taxonomy', {},{params: {name: taxonomyName, type: taxType, sub_type: subType,product_id: productId}})
      .pipe( map( (t) => t as Taxonomy));
  }

  update(taxonomyName: string, taxType: string, subType: string, productId: number, id: number): Observable<Taxonomy> {
    return this.http.put('http://localhost:8080/project2/taxonomy', {},{params: {name: taxonomyName, type: taxType, sub_type: subType,product_id: productId, taxonomy_id: id}})
      .pipe( map( (t) => t as Taxonomy));
  }

  delete(taxonomyId: number){
    return this.http.delete(`http://localhost:8080/project2/taxonomy?taxonomy_id=${taxonomyId}`);
  }
}
