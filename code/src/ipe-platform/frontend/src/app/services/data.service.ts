import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) {}

  getTelemetryData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/telemetry`);
  }

  getEnterpriseData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/enterprise`);
  }
}