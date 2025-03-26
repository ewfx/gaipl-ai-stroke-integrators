import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available app-wide
})
export class GeminiService {
  private apiUrl = 'http://localhost:3000/api/gemini';

  constructor(private http: HttpClient) {}

  chat(prompt: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { prompt });
  }
}