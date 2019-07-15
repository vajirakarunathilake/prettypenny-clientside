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
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/taxonomies')
      .pipe( map( (t) => t as Taxonomy[]));
  }


  findById(taxonomyId: number): Observable<Taxonomy> {
    return this.http.get(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/taxonomy?taxonomyId=${taxonomyId}`)
      .pipe( map( (t) => t as Taxonomy));
  }

  insert(taxonomyName: string, taxType: string, subTypee: string, prodId: number): any {
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/taxonomy',
     {name: taxonomyName, type: taxType, subType: subTypee, productId: prodId})
    .pipe( map( (response: any) => response.json()));
  }

  update(taxonomyName: string, taxType: string, subTypee: string, prodId: number, id: number): any {
    return this.http.put('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/taxonomy',
     {name: taxonomyName, type: taxType, subType: subTypee, productId: prodId, taxonomyId: id})
    .pipe( map( (response: any) => response.json()));
  }

  delete(taxonomyId: number): any {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/taxonomy?taxonomyId=${taxonomyId}`)
    .pipe( map( (response: any) => response.json()));
  }
}
