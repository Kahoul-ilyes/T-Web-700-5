import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/** Mapping the user routes from the back
 *
 */
export class UserService {
  URL = 'localhost:3000/';

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




  constructor(private httpClient: HttpClient) { }

}
