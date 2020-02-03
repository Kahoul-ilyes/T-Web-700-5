import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';
import {UserModel} from './user.model';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {

  currentUser = new UserModel('', '', '', '', new Array(), new Array());
  private usersubs: Subscription;

  constructor(private httpClient: HttpClient, public auth: AuthService) {
     this.usersubs = auth.userProfile$.subscribe(userAuthO => {
      console.log('user' , userAuthO);
      if (userAuthO !== null ) {

        console.log(userAuthO.sub.split('|'));
        console.log(userAuthO.sub.split('|')[1]);
        this.currentUser = new UserModel(userAuthO.sub.split('|')[1], userAuthO.nickname, userAuthO.email, 'EUR', new Array(), new Array());
        this.getUser(userAuthO.sub.split('|')[1]).subscribe(next => {
            console.log('User connect ', next);
          }
        );
      }
    });
    // const listener  = auth.userProfile$.subscribe(res => console.log('listener' , res));
  }

  URL = environment.apiBaseUrl;

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
    console.log('requetes', this.URL +  '/api/v0/users/' + userId );
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
