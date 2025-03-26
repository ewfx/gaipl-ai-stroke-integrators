import { Component } from '@angular/core';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { TelemetryComponent } from '../telemetry/telemetry.component';
import { EnterpriseDataComponent } from '../enterprise-data/enterprise-data.component';
import { ContextExtractionComponent } from '../context-extraction/context-extraction.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChatbotComponent,
    TelemetryComponent,
    EnterpriseDataComponent,
    ContextExtractionComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}