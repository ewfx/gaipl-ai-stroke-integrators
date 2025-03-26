import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-telemetry-dialog',
  standalone: true,
  templateUrl: './telemetry-dialog.component.html',
  styleUrls: ['./telemetry-dialog.component.css']
})
export class TelemetryDialogComponent {
  @Output() close = new EventEmitter<void>();
}