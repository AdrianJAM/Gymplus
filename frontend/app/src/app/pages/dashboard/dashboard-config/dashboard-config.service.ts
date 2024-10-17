import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardConfigService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  healthCheck(): Observable<HealthCheck> {
    return this.http.get<HealthCheck>(`${this.url}/health`);
  }
}

export interface HealthCheck {
  status: string;
}
