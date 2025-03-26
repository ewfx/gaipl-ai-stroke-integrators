import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-telemetry-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './telemetry-chart.component.html',
  styleUrls: ['./telemetry-chart.component.css']
})
export class TelemetryChartComponent {
  @Input() telemetryData: any;
}