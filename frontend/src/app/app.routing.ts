import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {CryptoPageComponent} from './crypto/crypto-page/crypto-page.component';
import {ArticleListComponent} from './article/article-list/article-list.component';
import {ArticlePageComponent} from './article/article-page/article-page.component';

import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  { path: '', component: CryptoPageComponent},
  { path: 'articles', component: ArticleListComponent},
  { path: 'article/:id', component: ArticlePageComponent},

  { path: 'cryptos', component: CryptoPageComponent},
  { path: 'profile', component: ProfileComponent},



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
