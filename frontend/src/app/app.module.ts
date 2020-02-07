// Core

import { NgModule } from '@angular/core';

import { appRoutingModule } from './app.routing';

// App Module
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AdminModule } from './admin/admin.module';
import { CryptoModule } from './crypto/crypto.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
// Http Requests
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// For ?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { addRssDialog } from './admin/admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { AddRssComponent } from './admin/add-rss/add-rss.component';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { AddCryptoComponent } from './admin/add-crypto/add-crypto.component';


@NgModule({

  imports: [
    // Our components
    ArticleModule,
    CryptoModule,
    CoreModule,
    UserModule,
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    // Materials components
    MatButtonModule,
    MatToolbarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    // Http requests modules
    HttpClientModule,
    HttpClientModule,
    // Routing
    appRoutingModule,
    // Forms
    ReactiveFormsModule,
  ],
  declarations: [
    // addRssDialog,
    AddRssComponent,
    AddCryptoComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    // addRssDialog
    AddRssComponent,
    AddCryptoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

