import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergyDisplayRoutingModule } from './energy-display-routing.module';
import { EnergyDisplayComponent } from './energy-display.component';
//import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [EnergyDisplayComponent],
  imports: [
    CommonModule,
    EnergyDisplayRoutingModule,
    //NgxChartsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
  ],
})
export class EnergyDisplayModule {}
