import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent implements AfterViewChecked {
  messages: { sender: string; content: string }[] = [];
  userMessage: string = '';
  conversationId: string;
  @ViewChild('chatHistory') private chatHistory!: ElementRef;

  constructor(private chatbotService: ChatbotService) {
    // Check if a conversationId exists in localStorage
    this.conversationId = localStorage.getItem('conversationId') ?? "";
    if (!this.conversationId) {
      this.conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('conversationId', this.conversationId);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async sendMessage() {
    if (!this.userMessage.trim()) return; // Ignore empty messages

    // Add user message to chat history
    this.messages.push({ sender: 'user', content: this.userMessage });

    try {
      // Send message to backend with conversationId
      const response = await this.chatbotService.sendMessage(this.userMessage, this.conversationId).toPromise();
      this.messages.push({ sender: 'ai', content: response.message });
    } catch (error) {
      // Use a type guard to check if error is an Error object
      if (error instanceof Error) {
        this.messages.push({ sender: 'ai', content: `Error: ${error.message}` });
      } else {
        // Fallback for non-Error objects
        this.messages.push({ sender: 'ai', content: 'Error: An unknown error occurred' });
      }
    }

    // Clear input field
    this.userMessage = '';
  }

  private scrollToBottom(): void {
    if (this.chatHistory) {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    }
  }
}