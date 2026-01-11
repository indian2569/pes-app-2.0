import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { ReportRoutingModule } from './report-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ]
})
export class ReportModule { }
