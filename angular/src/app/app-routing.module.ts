import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuardService} from './_services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'entry_line',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule)
  },
  {
    path: 'card_line',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./card/card.module').then(m => m.CardModule)
  },
  {
    path: 'setting',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'report',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
