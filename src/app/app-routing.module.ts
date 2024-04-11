import { NgModule } from '@angular/core';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
