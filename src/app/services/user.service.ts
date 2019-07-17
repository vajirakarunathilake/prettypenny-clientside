import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Helpers } from '../helpers';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, public helper: Helpers) { }
  id: number;
  login(email: string, password: string): Observable<User> {
    let user = new User();
    user.email = email;
    user.password = password;
    return this.http.post(`${environment.apiBase}/user/login`, user)
      .pipe( map( (u) => u as User));
  }

  insert(user: User): Observable<any> {
    console.log(user.email);
    return this.http.post(`${environment.apiBase}/user`, user)
    .pipe( map( (response: any) => response));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get(`${environment.apiBase}/user/getLoggedInUser`)
      .pipe( map( (u) => u as User));
  }

  logout(): any {
    this.helper.removeStorageItem('email');
    this.helper.removeStorageItem('firstName');
    this.helper.removeStorageItem('lastName');
    this.helper.removeStorageItem('address');
    this.helper.removeStorageItem('creditCardNumber');
    this.helper.removeStorageItem('cvv');
    this.helper.removeStorageItem('role');
    this.helper.removeStorageItem('userId');
    return this.http.get(`${environment.apiBase}/user/logout`)
    .pipe( map( (response: any) => response));
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.apiBase}/user`, user)
    .pipe( map( (response: any) => response));
  }

  delete(user: User): Observable<any> {
    return this.http.delete(`${environment.apiBase}/user?userId=${user.userId}`)
    .pipe( map( (response: any) => response));
  }



}
