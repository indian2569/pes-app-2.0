import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { AllEntryComponent } from './all-entry/all-entry.component';

import { SharedModule } from '../shared/shared.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    EntryComponent,
    AllEntryComponent,
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class EntryModule { }
