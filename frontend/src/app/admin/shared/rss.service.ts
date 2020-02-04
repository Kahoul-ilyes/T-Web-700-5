import { Injectable } from '@angular/core';
import {RssModel} from './rss.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  constructor(private httpClient: HttpClient) { }
  ListAllRss = new Array<RssModel>();

  url = environment.apiBaseUrl;

  getAllRss() {
    return this.httpClient.get(this.url + '/api/v0/rss/');
  }

  getRssById(id: string) {
    return this.httpClient.get(this.url + '/api/v0/rss/' + id);
  }
}


