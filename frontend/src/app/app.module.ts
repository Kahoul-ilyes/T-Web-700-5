// Core
import { NgModule } from '@angular/core';

import { appRoutingModule } from './app.routing';

import {AlertComponent} from './user/alert/alert.component';
import {RegisterComponent} from './user/register/register.component';
import {HomeComponent} from './user/home/home.component';
import {JwtInterceptor} from './user/helpers/jwt.interceptor';
import {ErrorInterceptor} from './user/helpers/error.interceptor';
import {fakeBackendProvider} from './user/helpers/fake-backend';

// App Module
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import {CryptoModule} from './crypto/crypto.module';
import {CoreModule} from './core/core.module';
// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
// Http Requests
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// For ?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import {UserModule} from './user/user.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CryptoModule,
    CoreModule,
    UserModule,
    MatButtonModule,
    MatToolbarModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  declarations: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

