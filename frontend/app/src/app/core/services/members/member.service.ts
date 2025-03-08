import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './../../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'tu-url-api/Members'; // Ajusta según tu API

  constructor(private http: HttpClient) {}

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  create(Member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, Member);
  }

  getbyid(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  update(id: string, Member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, Member);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
