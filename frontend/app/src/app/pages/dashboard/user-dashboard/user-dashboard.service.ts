import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user-dashboard.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  create(user: any): Observable<any> {
    return this.http.post(`${this.url}/user`, user);
  }
  getbyid(userId: string): Observable<any> {
    return this.http.get(`${this.url}/user/${userId}`);
  }

  update(userId: string, user: User): Observable<any> {
    return this.http.put(`${this.url}/users/${userId}`, user);
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.url}/user/${userId}`);
  }

  getbyemail(email: string): Observable<any> {
    return this.http.get(`${this.url}/user/email/${email}`);
  }
  getbyci(ci: string): Observable<any> {
    return this.http.get(`${this.url}/user/ci/${ci}`);
  }
}
