import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  id: number;
  login(email: string, password: string): Observable<User> {
    return this.http.post(`${environment.apiBase}/user/login`, {email, password})
      .pipe( map( (u) => u as User));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get(`${environment.apiBase}/user/getLoggedInUser`)
      .pipe( map( (u) => u as User));
  }

  logout(): any {
    localStorage.remove('email');
    localStorage.remove('firstname');
    localStorage.remove('lastname');
    localStorage.remove('address');
    localStorage.remove('creditCardNumber');
    localStorage.remove('cvv');
    localStorage.remove('role');
    return this.http.get(`${environment.apiBase}/user/logout`)
    .pipe( map( (response: any) => response));
  }

  insert(user: User): Observable<any> {
    return this.http.post(`${environment.apiBase}/user/insert`, JSON.stringify(user))
    .pipe( map( (response: any) => response));
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.apiBase}/user/update`, JSON.stringify(user))
    .pipe( map( (response: any) => response));
  }

  delete(user: User): Observable<any> {
    return this.http.delete(`${environment.apiBase}/user?userId=${user.userId}`)
    .pipe( map( (response: any) => response));
  }



}
