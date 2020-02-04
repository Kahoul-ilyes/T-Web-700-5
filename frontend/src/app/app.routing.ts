import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {CryptoPageComponent} from './crypto/crypto-page/crypto-page.component';
import {ArticleListComponent} from './article/article-list/article-list.component';
import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: CryptoPageComponent},
  { path: 'article', component: ArticleListComponent},
  { path: 'cryptos', component: CryptoPageComponent},



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: CryptoPageComponent},
    { path: 'article', component: ArticleListComponent},
    { path: 'cryptos', component: CryptoPageComponent},
  
  
  
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
  ])],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})


export class AppRoutingModule { }
