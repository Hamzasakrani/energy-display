import { Component, OnInit } from '@angular/core';
import { EnergyDisplayService } from 'src/app/services/energy-display.service';

@Component({
  selector: 'app-energy-display',
  templateUrl: './energy-display.component.html',
  styleUrls: ['./energy-display.component.css'],
})
export class EnergyDisplayComponent implements OnInit {
  data: any[] = []; // Your data structure might differ

  average: number = 0;
  peakTime: string = '';
  totalConsumption: number = 0;
  mostFrequentStatus: string = '';
  displayedColumns: string[] = ['time', 'value', 'status'];

  constructor(private dataService: EnergyDisplayService) {}

  ngOnInit() {
    this.fetchData();
    this.summaryData();
  }

  fetchData() {
    // Assuming dataService.getData returns an Observable of your data
    this.dataService.getData().subscribe((data) => {
      this.data = data;

      //  this.calculateMetrics();
    });
  }

  calculateMetrics() {
    // Calculate your metrics based on this.data
    // Update this.average, this.peakTime, this.totalConsumption, this.mostFrequentStatus
  }
  summaryData() {
    this.dataService.summaryData().subscribe((data) => {
      this.average = data.averageEnergyConsumption;
      this.peakTime = data.highestEnergyTimestamp;
      this.totalConsumption = data.totalEnergyConsumed;
      this.mostFrequentStatus = data.mostFrequentStatus;
    });
  }
  simulateNewData() {
    this.dataService.simulateNewData().subscribe((newData) => {
      this.data.push(newData);
      //   this.calculateMetrics();
    });
  }
}
