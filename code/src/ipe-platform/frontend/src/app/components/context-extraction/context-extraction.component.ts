import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-context-extraction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './context-extraction.component.html',
  styleUrls: ['./context-extraction.component.css']
})
export class ContextExtractionComponent {
  incidentDescription: string = '';
  context: any = null;

  constructor(private contextService: ContextService) {}

  extractContext() {
    if (this.incidentDescription.trim()) {
      this.contextService.extractContext(this.incidentDescription).subscribe(
        (data) => {
          this.context = data;
        },
        (err) => {
          console.error('Error extracting context:', err);
        }
      );
    }
  }
}