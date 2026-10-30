import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TableRecordsComponent } from './table-records/table-records.component';
import { TableEntryComponent } from './table-entry/table-entry.component';
import { TableColapseComponent } from './table-colapse/table-colapse.component';
import { TableComponent } from './table/table.component';
import { EntityDialogComponent } from './entity-dialog/entity-dialog.component';
import { TableCardComponent } from './table-card/table-card.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DasbordBoxComponent } from './dasbord-box/dasbord-box.component';
import localeSk from '@angular/common/locales/sk';
import localeSkExtra from '@angular/common/locales/extra/sk';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";

registerLocaleData(localeSk, localeSkExtra);

/**
 * Tables, dialogs and the dashboard box used across the app.
 * Form controls (chips, date pickers, selects, tabs) live in FormControlsModule, so pages
 * that only show tables (home, settings) don't download them.
 */
@NgModule({
  declarations: [
      TableRecordsComponent,
      TableEntryComponent,
      TableColapseComponent,
      TableComponent,
      EntityDialogComponent,
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
    MatIconModule,
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
    TableCardComponent,
    DialogBoxComponent,
    ConfirmDialogComponent,
    DasbordBoxComponent,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
})
export class SharedModule { }
