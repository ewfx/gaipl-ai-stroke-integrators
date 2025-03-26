import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenticService {
  private apiUrl = 'http://localhost:3000/api/agentic';

  constructor(private http: HttpClient) {}

  launchHealthCheck(serviceId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/health-check/${serviceId}`, {});
  }

  generateRCA(incidentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rca/${incidentId}`, {});
  }

  executeAutomation(scriptName: string, params: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/automation/${scriptName}`, params);
  }

  getRelatedIncidents(incidentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/related-incidents/${incidentId}`);
  }
} 