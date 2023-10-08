import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//lazy loading my component will be created after call energy-display URL
const routes: Routes = [
  {
    path: 'energy-display',
    loadChildren: () =>
      import('./components/energy-display/energy-display.module').then(
        (m) => m.EnergyDisplayModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
