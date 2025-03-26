import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:3000/api/gemini';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, conversationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, { message, conversationId });
  }

  getConversationHistory(conversationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${conversationId}`);
  }
}