import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  prompt: string = '';
  conversation: { role: string; content: string }[] = [];
  conversationId: string = '';

  constructor(private geminiService: GeminiService) {}

  ngOnInit() {
    // Generate a unique conversation ID (could be tied to user session in production)
    this.conversationId = 'conv_' + Date.now();
  }

  sendMessage() {
    if (this.prompt.trim()) {
      // Add user message to conversation
      this.conversation.push({ role: 'user', content: this.prompt });

      this.geminiService.chat(this.prompt, this.conversationId).subscribe(
        (res) => {
          // Add AI response to conversation
          this.conversation.push({ role: 'assistant', content: res.response });
          this.prompt = ''; // Clear the input
        },
        (err) => {
          this.conversation.push({ role: 'assistant', content: 'Error: ' + err.message });
        }
      );
    }
  }
}