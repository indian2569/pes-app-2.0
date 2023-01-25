import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';


const reportRoutes: Routes = [
  {
    path: '',
    component: ReportComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      reportRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ReportRoutingModule { }
