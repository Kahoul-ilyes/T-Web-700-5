import { Routes, RouterModule } from '@angular/router';
import {CryptoListComponent} from './crypto/cryptolist/crypto-list.component';
import {AuthGuard} from './auth.guard';



const routes: Routes = [
  { path: '', component: CryptoListComponent},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
