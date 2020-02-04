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
  /**
   * Constructeur complet
   */
  constructor(id, username, email, currency, cryptos, keywords) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.currency = currency;
    this.cryptos = cryptos;
    this.keywords = keywords;
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
    this.cryptos.splice(this.keywords.lastIndexOf(keyword), 1);
  }


  public containsCrypto(symbol: string): boolean {
    return this.cryptos.includes(symbol);
  }

  public containsKeyWords(keyword: string): boolean {
    return this.keywords.includes(keyword);
  }
  /** Format to JSON */
  toJSON(): string {
    let json = '{';
    json += ' "username" : "' + this.username + '", ';
    json += ' "email" : "' + this.email + '", ';

    json += ' "cryptos" : [';
    this.cryptos.forEach((crypto, val) => {
      json += '"' + crypto + '"';
      if (val !== this.cryptos.length - 1) {
        json += ',';
      }
    });
    json += '], ';

    json += ' "keywords" : [';
    this.keywords.forEach((keywords, val) => {

      json += '"' + keywords + '"';
      if (val !== this.keywords.length - 1) {
        json += ',';
      }
    });
    json += '] }';

    console.log('json send ', json);
    return json;
  }
}

