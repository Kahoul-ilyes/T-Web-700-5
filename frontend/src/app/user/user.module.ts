import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../app.component';

import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
