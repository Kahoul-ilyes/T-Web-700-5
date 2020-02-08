import { Injectable } from '@angular/core';
import {ArticleModel} from './article.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {
    this.initArticle().subscribe(res => console.log('init RSS', res));
  }
  ListAllArticle = new Array<ArticleModel>();

  url = environment.apiBaseUrl;


  getArticlesByKeywords(keywords: string[]) {
    let keywordChain = '';
    if (keywords !== null) {
      keywordChain += '?keywords=';
      keywords.forEach(keyword => keywordChain += keyword + ',');
    }
    console.log('requete', this.url + '/api/v0/articles/' + keywordChain );
    return this.httpClient.get(this.url + '/api/v0/articles/' + keywordChain );
  }


  initArticle() {
    return this.httpClient.get(this.url + '/api/v0/rss');
  }
  getArticleById(id: string) {
    return this.httpClient.get(this.url + '/api/v0/articles/' + id );
  }
}


