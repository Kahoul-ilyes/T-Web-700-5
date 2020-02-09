import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {CryptoPageComponent} from './crypto/crypto-page/crypto-page.component';
import {ArticleListComponent} from './article/article-list/article-list.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: '', component: CryptoPageComponent},
  { path: 'article', component: ArticleListComponent},
  { path: 'cryptos', component: CryptoPageComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
