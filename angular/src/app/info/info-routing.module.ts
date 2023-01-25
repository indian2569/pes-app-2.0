import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { SupportComponent } from './support/support.component';
import { AboutStatisticComponent } from './about-statistic/about-statistic.component';

const infoRoutes: Routes = [
  {
    path: 'about_program',
    component: InfoComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'about_statistic',
    component: AboutStatisticComponent,
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(
      infoRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class InfoRoutingModule { }
