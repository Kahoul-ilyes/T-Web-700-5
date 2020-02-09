import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';
import {UserModel} from './user.model';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {

  currentUser = new UserModel('', '', '', '', new Array(), new Array(), new Array());
  private usersubs: Subscription;

  constructor(private httpClient: HttpClient, public auth: AuthService) {

    /*
     Si l'user est connecté alors on consulte la bdd pou savoir si l'user est dedans, si oui on récupère ses data, sinon on l'initialize
     */
    this.usersubs = auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO !== undefined && userAuthO !== null) {
        this.getUser(userAuthO.sub).subscribe(res => {
          // @ts-ignore
          const setUser = res.user;
          const roles = res['roles'];
          // tslint:disable-next-line:max-line-length
          if (setUser !== undefined && setUser.user_metadata !== null && setUser.user_metadata.cryptos !== undefined && setUser.user_metadata.keywords !== undefined ) {
            
            
            this.currentUser = new UserModel(setUser.user_id,
              setUser.username, setUser.email, setUser.user_metadata.currency,
              setUser.user_metadata.cryptos, setUser.user_metadata.keywords, []);
            this.currentUser.setRoles(roles)
          } else {
            this.initializeUser(userAuthO.sub).subscribe(initializedRes => {
              // @ts-ignore
              const setNewUser = initializedRes.user;
              // tslint:disable-next-line:max-line-length
              if (setNewUser !== undefined && setNewUser.user_metadata !== null && setNewUser.user_metadata.cryptos !== undefined && setNewUser.user_metadata.keywords !== undefined ) {
                this.currentUser = new UserModel(setNewUser.user_id,
                  setNewUser.username, setUser.email, setNewUser.user_metadata.currency,
                  setNewUser.user_metadata.cryptos, setNewUser.user_metadata.keywords, []);

                this.currentUser.setRoles(['basic'])
              }
            });
          }
        });
      }
    });
  }

  URL = environment.apiBaseUrl;


  /**
   * Request all users
   */
  public getAllUsers() {
    return this.httpClient.get(this.URL + '/api/v0/users/');
  }

  /**
   * Request all users
   */
  public initializeUser(id: string) {
    console.log('initialize' , this.URL + '/api/v0/users/' + id + '/initialize');
    return this.httpClient.post(this.URL + '/api/v0/users/' + id + '/initialize', '');
  }

  /**
   * Request a single user
   * @param userI duser unique id
   */
  public getUser(userId: string ) {
    console.log('requetes', this.URL +  '/api/v0/users/' + userId );
    return this.httpClient.get(this.URL +  '/api/v0/users/' + userId );
  }

  public updateUser(userId: string, body) {
    console.log('body' , body);

    return this.httpClient.patch(this.URL +  '/api/v0/users/' + userId, body );
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
