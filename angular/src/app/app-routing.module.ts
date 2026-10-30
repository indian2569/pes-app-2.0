import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {authGuard} from './_services/auth-guard.service';

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
    canActivate: [authGuard],
    loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule)
  },
  {
    path: 'card_line',
    canActivate: [authGuard],
    loadChildren: () => import('./card/card.module').then(m => m.CardModule)
  },
  {
    path: 'setting',
    canActivate: [authGuard],
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'report',
    canActivate: [authGuard],
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // login, register and profile keep their top-level URLs (/login, /register, /profile)
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {})],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
