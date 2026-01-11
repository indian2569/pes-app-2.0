import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TableRecordsComponent } from './table-records/table-records.component';
import { TableEntryComponent } from './table-entry/table-entry.component';
import { TableColapseComponent } from './table-colapse/table-colapse.component';
import { TableComponent } from './table/table.component';
import { EntityDialogComponent } from './entity-dialog/entity-dialog.component';
import { ChipsInputComponent } from './chips/chips-input.component';
import { TableCardComponent } from './table-card/table-card.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { DasbordBoxComponent } from './dasbord-box/dasbord-box.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomDateAdapter } from '../config/custom.date.adapter';
import localeSk from '@angular/common/locales/sk';
import localeSkExtra from '@angular/common/locales/extra/sk';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";

registerLocaleData(localeSk, localeSkExtra);

@NgModule({
  declarations: [
      TableRecordsComponent,
      TableEntryComponent,
      TableColapseComponent,
      TableComponent,
      EntityDialogComponent,
      ChipsInputComponent,
      TableCardComponent,
      DialogBoxComponent,
      ConfirmDialogComponent,
      DasbordBoxComponent

  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCardModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,

  ],
  exports: [
    TableRecordsComponent,
    TableEntryComponent,
    TableColapseComponent,
    TableComponent,
    EntityDialogComponent,
    ChipsInputComponent,
    TableCardComponent,
    DialogBoxComponent,
    ConfirmDialogComponent,
    DasbordBoxComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCardModule,
    MatNativeDateModule
  ],
  providers: [{ provide: NgxMatDateAdapter, useClass: CustomDateAdapter}],
})
export class SharedModule { }
