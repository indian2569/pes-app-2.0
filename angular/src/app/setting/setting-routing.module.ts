import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionsComponent } from './institutions/institutions.component';
import { CampaignesComponent } from './campaignes/campaignes.component';
import { MethodsComponent } from './methods/methods.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { EventsComponent } from './events/events.component';
import { ProgramsComponent } from './programs/programs.component';


const settingRoutes: Routes = [
  { path: 'other_institutions', component: InstitutionsComponent, },
  { path: 'campaigns', component: CampaignesComponent, },
  { path: 'methods', component: MethodsComponent, },
  { path: 'programs', component: ProgramsComponent, },
  { path: 'coworkers', component: CoworkersComponent, },
  { path: 'events', component: EventsComponent, }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      settingRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class SettingRoutingModule { }
