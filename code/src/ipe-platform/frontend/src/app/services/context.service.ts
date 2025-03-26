import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private apiUrl = 'http://localhost:3000/api/context';

  constructor(private http: HttpClient) {}

  extractContext(incidentDescription: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/extract`, { incidentDescription });
  }
}