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
import { AddRssComponent } from './admin/add-rss/add-rss.component';
import { AddCryptoComponent } from './admin/add-crypto/add-crypto.component';
import { ProfileComponent } from './profile/profile.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
// Http Requests
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// For ?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";


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
    MatSnackBarModule,
    // Http requests modules
    HttpClientModule,
    HttpClientModule,
    // Routing
    appRoutingModule,
    // Forms
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  declarations: [
    ProfileComponent,
    AddRssComponent,
    AddCryptoComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  entryComponents: [
    AddRssComponent,
    AddCryptoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

