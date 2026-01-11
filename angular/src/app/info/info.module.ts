import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { InfoRoutingModule } from './info-routing.module';
import { SupportComponent } from './support/support.component';
import { AboutStatisticComponent } from './about-statistic/about-statistic.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [InfoComponent,
     SupportComponent,
     AboutStatisticComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class InfoModule { }
