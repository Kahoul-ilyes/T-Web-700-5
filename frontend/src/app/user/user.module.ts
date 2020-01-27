import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './alert/alert.component';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
