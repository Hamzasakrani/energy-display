import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyDisplayComponent } from './energy-display.component';

const routes: Routes = [{ path: '', component: EnergyDisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergyDisplayRoutingModule { }
