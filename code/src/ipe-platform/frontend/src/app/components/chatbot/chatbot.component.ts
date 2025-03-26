import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'; // Import NgIf
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgIf], // Add NgIf to imports
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  prompt: string = '';
  response: string = '';

  constructor(private geminiService: GeminiService) {}

  sendMessage() {
    if (this.prompt.trim()) {
      this.geminiService.chat(this.prompt).subscribe(
        (res) => {
          this.response = res.response;
        },
        (err) => {
          this.response = 'Error: ' + err.message;
        }
      );
    }
  }
}