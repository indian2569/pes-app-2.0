import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // only the app shell (toolbar and menus) is here; every page, login/register/profile included,
    // is lazy loaded by AppRoutingModule so it stays out of the initial bundle
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    NgOptimizedImage
  ],
  providers: [authInterceptorProviders,
             errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
