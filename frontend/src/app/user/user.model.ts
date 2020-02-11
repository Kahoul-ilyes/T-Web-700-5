/**
 * Classe qui mappe la structure des données recues de l'api
 */
import {Observable, of} from 'rxjs';
import { BehaviorSubject } from 'rxjs';


export class UserModel {
  /** id unique de l'user ( fourni back) */
  id: string;
  /** Pseudo de l'user  */
  username: string;
  /** Email */
  email: string;
  /** Currency principale de l'user */
  currency: string;
  /** Cryptos liées à l'user  */
  cryptos =  new Array<string>();
  /** Mots clés lié a l'user */
  keywords: Array<string>;
  // cryptos$ = new BehaviorSubject(this.cryptos);
  cryptos$ = of(this.cryptos);

  keywords$  = of(this.keywords);

  admin$ = of(this.isAdmin());

  roles: Array<string>;
  /**
   * Constructeur complet
   */
  constructor(id, username, email, currency, cryptos, keywords, roles) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.currency = currency;
    this.cryptos = cryptos;
    this.keywords = keywords;
    this.roles = roles;
  }

  /**
   * Set user roles
   * @param roles
   */
  public setRoles(roles) {
    for (const r of roles) {
      this.roles.push(r.name);
    }
  }

  /**
   * Return true if the user is an admin, oherwise return false
   */
  public isAdmin(): boolean {
    if (this.roles === undefined) return false;
    return this.roles.indexOf('admin') > -1 ? true : false;

  }

  /**
   * Return true if the user is a basic user, oherwise return false
   */
  public isBasic(): boolean {
    return this.roles.indexOf('basic') > -1 ? true : false;
  }

  /** Renvois true si keywords n'estp as vide */
  public hasKeyWords(): boolean {
    return this.keywords.length !== 0;
  }

  /** Renvois true si cryptos n'est pas vide */
  public hasCryptos(): boolean {
    return this.cryptos.length !== 0;
  }

  public addCrypto(symbol: string) {
    this.cryptos.push(symbol);
  }

  public addKeyword(keyword: string) {
    this.keywords.push(keyword);
  }

  public removeCrypto(symbol: string) {
    this.cryptos.splice(this.cryptos.lastIndexOf(symbol), 1);
  }

  public removeKeyword(keyword: string) {
    this.keywords.splice(this.keywords.lastIndexOf(keyword), 1);
  }


  public containsCrypto(symbol: string): boolean {
    return this.cryptos.includes(symbol);
  }

  public containsKeyWords(keyword: string): boolean {
    return this.keywords.includes(keyword);
  }

  public setUser(id, username, email, currency, cryptos, keywords, roles) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.currency = currency;
    this.cryptos = cryptos;
    this.keywords = keywords;
    this.roles = roles;
  }
  /** Format to JSON */
  toJSON() {
    return {
      cryptos: this.cryptos,
      keywords : this.keywords
    };
  }

  hasPassword(): boolean {
    return !this.id.includes('-') && !(this.id === '');
  }
}

