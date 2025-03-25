import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    NgFor, NgIf, NgClass, FormsModule,
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { text: string; sender: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;
    
    this.messages.push({ text: this.userInput, sender: 'user' });

    this.http.post<any>('http://localhost:5000/api/chatbot', { message: this.userInput })
      .subscribe(response => {
        this.messages.push({ text: response.reply, sender: 'ai' });
      });

    this.userInput = '';
  }
}
