import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { CampaignesComponent } from './campaignes/campaignes.component';
import { MethodsComponent } from './methods/methods.component';
import { ProgramsComponent } from './programs/programs.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { EventsComponent } from './events/events.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { TableColapseComponent } from '../shared/table-colapse/table-colapse.component';
import { TableComponent } from '../shared/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';
import { EntityDialogComponent } from '../shared/entity-dialog/entity-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [InstitutionsComponent,
                 CampaignesComponent,
                 MethodsComponent,
                 ProgramsComponent,
                 CoworkersComponent,
                 EventsComponent,
                 TableColapseComponent,
                 TableComponent,
                 DialogBoxComponent,
                 EntityDialogComponent,
                 ConfirmDialogComponent,
    ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class SettingModule { }
