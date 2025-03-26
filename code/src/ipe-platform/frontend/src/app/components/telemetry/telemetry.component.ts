import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryChartComponent } from './telemetry-chart/telemetry-chart.component';
import { TelemetryDialogComponent } from './telemetry-dialog/telemetry-dialog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-telemetry',
  standalone: true,
  imports: [TelemetryChartComponent, TelemetryDialogComponent, CommonModule],
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent implements OnInit {
  showDialog = false;
  telemetryData: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadTelemetryData();
  }

  loadTelemetryData() {
    this.dataService.getTelemetryData().subscribe(
      (data) => {
        this.telemetryData = data;
      },
      (err) => {
        console.error('Error loading telemetry data:', err);
      }
    );
  }

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}