import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  id: number;
  login(email: string, password: string): Observable<User> {
    return this.http.post('http://localhost:8080/project2/api/user/login', {email, password})
      .pipe( map( (u) => u as User));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get('http://localhost:8080/project2/api/user/getLoggedInUser')
      .pipe( map( (u) => u as User));
  }

  logout(): Observable<User> {
    return this.http.get('http://localhost:8080/project2/api/user/logout')
      .pipe( map( (u) => u as User));
  }

  insert(user: User): any {
    return this.http.post('http://localhost:8080/project2/api/user/insert', JSON.stringify(user))
    .pipe( map( (response: any) => response.json()));
  }

  update(user: User): Observable<User> {
    return this.http.put('http://localhost:8080/project2/api/user/update', JSON.stringify(user))
      .pipe( map( (u) => u as User));
  }

  delete(user: User){
    return this.http.delete('http://localhost:8080/project2/api/user?userId=${user.id}');
  }



}
