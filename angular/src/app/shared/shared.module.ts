import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRecordsComponent } from './table-records/table-records.component';
import { TableEntryComponent } from './table-entry/table-entry.component';
import { TableColapseComponent } from './table-colapse/table-colapse.component';
import { TableComponent } from './table/table.component';
import { EntityDialogComponent } from './entity-dialog/entity-dialog.component';
import { ChipsInputComponent } from './chips/chips-input.component';
import { TableCardComponent } from './table-card/table-card.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatNativeDateModule } from '@angular/material/core';
import { DasbordBoxComponent } from './dasbord-box/dasbord-box.component';

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
      DasbordBoxComponent,

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
  ]
})
export class SharedModule { }
