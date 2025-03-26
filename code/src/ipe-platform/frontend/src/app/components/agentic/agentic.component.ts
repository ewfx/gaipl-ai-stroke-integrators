import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgenticService } from '../../services/agentic.service';

@Component({
  selector: 'app-agentic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agentic.component.html',
  styleUrls: ['./agentic.component.css']
})
export class AgenticComponent implements OnInit {
  serviceId: string = '';
  incidentId: string = '';
  scriptName: string = '';
  automationParams: string = '';
  results: any = null;
  error: string = '';
  loading: boolean = false;

  constructor(private agenticService: AgenticService) {}

  ngOnInit(): void {}

  async launchHealthCheck() {
    if (!this.serviceId) {
      this.error = 'Please enter a service ID';
      return;
    }

    this.loading = true;
    this.error = '';
    try {
      this.results = await this.agenticService.launchHealthCheck(this.serviceId).toPromise();
    } catch (err) {
      this.error = 'Failed to launch health check';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async generateRCA() {
    if (!this.incidentId) {
      this.error = 'Please enter an incident ID';
      return;
    }

    this.loading = true;
    this.error = '';
    try {
      this.results = await this.agenticService.generateRCA(this.incidentId).toPromise();
    } catch (err) {
      this.error = 'Failed to generate RCA';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async executeAutomation() {
    if (!this.scriptName) {
      this.error = 'Please enter a script name';
      return;
    }

    this.loading = true;
    this.error = '';
    try {
      const params = this.automationParams ? JSON.parse(this.automationParams) : {};
      this.results = await this.agenticService.executeAutomation(this.scriptName, params).toPromise();
    } catch (err) {
      this.error = 'Failed to execute automation';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async getRelatedIncidents() {
    if (!this.incidentId) {
      this.error = 'Please enter an incident ID';
      return;
    }

    this.loading = true;
    this.error = '';
    try {
      this.results = await this.agenticService.getRelatedIncidents(this.incidentId).toPromise();
    } catch (err) {
      this.error = 'Failed to get related incidents';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
} 