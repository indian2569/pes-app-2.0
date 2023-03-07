import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { CampaignesComponent } from './campaignes/campaignes.component';
import { MethodsComponent } from './methods/methods.component';
import { ProgramsComponent } from './programs/programs.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { EventsComponent } from './events/events.component';
import { InstitutionsComponent } from './institutions/institutions.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InstitutionsComponent,
                 CampaignesComponent,
                 MethodsComponent,
                 ProgramsComponent,
                 CoworkersComponent,
                 EventsComponent,
    ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
