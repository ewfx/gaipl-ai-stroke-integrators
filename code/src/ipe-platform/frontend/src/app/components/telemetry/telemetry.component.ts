import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; // Import NgIf
import { TelemetryChartComponent } from './telemetry-chart/telemetry-chart.component';
import { TelemetryDialogComponent } from './telemetry-dialog/telemetry-dialog.component';

@Component({
  selector: 'app-telemetry',
  standalone: true,
  imports: [TelemetryChartComponent, TelemetryDialogComponent, NgIf], // Add NgIf to imports
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent {
  showDialog = false;

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}