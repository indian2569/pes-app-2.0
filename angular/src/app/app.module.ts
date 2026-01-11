import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';
import { HomeModule } from './home/home.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    NgOptimizedImage
  ],
  providers: [authInterceptorProviders,
             errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
