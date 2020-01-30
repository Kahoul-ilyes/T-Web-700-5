import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';
import {UserModel} from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {

  user = new UserModel('', '', '', '', new Array(), new Array());

  constructor(private httpClient: HttpClient, public auth: AuthService) {
    // this.user = new UserModel('', '', '', '', new Array(), new Array());
    // const listener  = auth.userProfile$.subscribe(res => console.log('listener' , res));
  }

  URL = 'localhost:4000/';

  /**
   * Request all users
   */
  public getAllUsers() {
    return this.httpClient.get(this.URL + '/api/v0/users/');
  }

  /**
   * Request a single user
   * @param userI duser unique id
   */
  public getUser(userId: string ) {
    return this.httpClient.get(this.URL +  '/api/v0/users/' + userId );
  }

  /**
   * Request a user's favrites crypto
   * @param userId user unique id
   */
  public getUserCrypto(userId: string) {
    return this.httpClient.get(this.URL + '/api/v0/users/' + userId + '/cryptos');
  }

  /**
   * Request a user's favorite keywords
   * @param userId user unique id
   */
  public getUserKeywords(userId: string) {
    return this.httpClient.get(this.URL + '/api/v0/users/' + userId + '/cryptos');
  }
}
