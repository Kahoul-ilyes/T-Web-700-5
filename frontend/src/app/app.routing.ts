import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './user/home/home.component';
import {AuthGuard} from './user/helpers/auth.guard';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {CryptoListComponent} from './crypto/cryptolist/crypto-list.component';


const routes: Routes = [
  { path: '', component: CryptoListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
