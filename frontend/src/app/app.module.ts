// Core

import { NgModule } from '@angular/core';

import { appRoutingModule } from './app.routing';

// App Module
import { AppComponent } from './app.component';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import {ArticleModule} from './article/article.module';
import { AdminModule } from './admin/admin.module';


@NgModule({

  imports: [
    ArticleModule,
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
    appRoutingModule,
    MatTooltipModule,
    AdminModule
  ],
  declarations: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

