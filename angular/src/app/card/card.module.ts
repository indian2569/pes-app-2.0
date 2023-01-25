import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CarRoutingModule } from './car-routing.module';
import { TableCardComponent } from '../shared/table-card/table-card.component';
import { TableRecordsComponent } from '../shared/table-records/table-records.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CardComponent,
    AllCardsComponent,
    TableCardComponent,
    TableRecordsComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]
})
export class CardModule { }
