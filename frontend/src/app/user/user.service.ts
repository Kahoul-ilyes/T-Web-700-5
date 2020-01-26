import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private httpClient: HttpClient) { }

  URL = 'localhost:3000/';

  getAll() {
    return this.httpClient.get<User[]>(`${config.apiUrl}/users`);
  }

  register(user: User) {
    return this.httpClient.post(`${config.apiUrl}/users/register`, user);
  }

  delete(id: number) {
    return this.httpClient.delete(`${config.apiUrl}/users/${id}`);
  }

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
