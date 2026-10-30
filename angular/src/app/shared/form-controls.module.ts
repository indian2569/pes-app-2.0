import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMatDatepickerInput, NgxMatDatepickerToggle, NgxMatDatetimepicker } from '@ngxmc/datetime-picker';
import { CustomDateAdapter } from '../config/custom.date.adapter';
import { ChipsInputComponent } from './chips/chips-input.component';

/** Form controls of the edit and filter pages: chips, date/time pickers, selects, tabs and cards. */
@NgModule({
  declarations: [
    ChipsInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    // the date-time picker parts are standalone, so they are imported here to be re-exported
    NgxMatDatetimepicker,
    NgxMatDatepickerInput,
    NgxMatDatepickerToggle
  ],
  exports: [
    ChipsInputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimepicker,
    NgxMatDatepickerInput,
    NgxMatDatepickerToggle
  ],
  // shared by the Material date pickers and the ngx date-time pickers (weeks start on Monday)
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class FormControlsModule { }
