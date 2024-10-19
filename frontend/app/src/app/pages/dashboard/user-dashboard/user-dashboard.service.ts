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

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, user);
  }
  getbyid(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/${userId}`);
  }

  update(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${userId}`, user);
  }

  delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/user/${userId}`);
  }

  getbyemail(email: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/email/${email}`);
  }
  getbyci(ci: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/ci/${ci}`);
  }
}
