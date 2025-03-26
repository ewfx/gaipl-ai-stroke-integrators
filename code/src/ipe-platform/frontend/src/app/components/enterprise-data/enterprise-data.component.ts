import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-enterprise-data',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './enterprise-data.component.html',
  styleUrls: ['./enterprise-data.component.css']
})
export class EnterpriseDataComponent implements OnInit {
  enterpriseData: any = null;
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadEnterpriseData();
  }

  loadEnterpriseData() {
    this.loading = true;
    this.error = null;
    this.dataService.getEnterpriseData().subscribe(
      (data) => {
        console.log('Enterprise data received:', data);
        this.enterpriseData = data;
        this.loading = false;
      },
      (err) => {
        console.error('Error loading enterprise data:', err);
        this.error = 'Failed to load enterprise data. Please try again later.';
        this.loading = false;
      }
    );
  }
}