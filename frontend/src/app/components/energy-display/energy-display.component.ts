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
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  barChartLabels: Int16Array[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  dataEnergyChart: string[] = [];

  barChartData = [{ data: this.dataEnergyChart, label: 'Energy' }];

  constructor(private dataService: EnergyDisplayService) {}

  ngOnInit() {
    //Init my componet with backend data
    this.fetchData();
    this.summaryData();
  }

  fetchData() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      data.map((element) => {
        this.barChartLabels.push(element.timestamp);
        this.dataEnergyChart.push(element.energyConsumption);
        this.barChartData = [{ data: this.dataEnergyChart, label: 'Energy' }];
      });
    });
  }
  // Summary data to to calculate metrics
  summaryData() {
    this.dataService.summaryData().subscribe((data) => {
      this.average = data.averageEnergyConsumption;
      this.peakTime = data.highestEnergyTimestamp;
      this.totalConsumption = data.totalEnergyConsumed;
      this.mostFrequentStatus = data.mostFrequentStatus;
    });
  }
  // Generate new data
  simulateNewData() {
    this.dataService.simulateNewData().subscribe(() => {
      this.fetchData();
      this.summaryData();
    });
  }
}
