import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = 'http://localhost:3000/api/incident';

  constructor(private http: HttpClient) {}

  analyzeIncident(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analyze`);
  }

  proposeSolution(analysis: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/propose`, { analysis });
  }

  executeAction(action: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/execute`, { action });
  }
}