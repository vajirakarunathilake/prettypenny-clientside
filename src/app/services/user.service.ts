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
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user/login', {email, password})
      .pipe( map( (u) => u as User));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user/getLoggedInUser')
      .pipe( map( (u) => u as User));
  }

  logout(): any {
    localStorage.removeItem("user");
    return this.http.get('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user/logout')
    .pipe( map( (response: any) => response.json()));
  }

  insert(user: User): any {
    return this.http.post('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user/insert', JSON.stringify(user))
    .pipe( map( (response: any) => response.json()));
  }

  update(user: User): any {
    return this.http.put('http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user/update', JSON.stringify(user))
    .pipe( map( (response: any) => response.json()));
  }

  delete(user: User): any {
    return this.http.delete(`http://ec2-18-224-165-117.us-east-2.compute.amazonaws.com:8080/project2-backend/api/user?userId=${user.userId}`)
    .pipe( map( (response: any) => response.json()));
  }



}
