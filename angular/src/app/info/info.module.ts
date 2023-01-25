import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { InfoRoutingModule } from './info-routing.module';
import { SupportComponent } from './support/support.component';
import { AboutStatisticComponent } from './about-statistic/about-statistic.component';



@NgModule({
  declarations: [InfoComponent,
     SupportComponent,
     AboutStatisticComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
  ]
})
export class InfoModule { }
