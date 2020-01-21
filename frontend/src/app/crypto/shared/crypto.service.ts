import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


/** Access level root */
@Injectable({
  providedIn: 'root'
})
/** Gestion des appels a la parti crypto du server et à l'API de CryptoCompare  */
export class CryptoService {

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'mon-entete-personnalise': 'maValeur'
    })
  };
  /** Main URL, a changer à la fin des test */
  URL = 'http://localhost:4000';
  // URL = 'http://35.214.83.191:4000';
  /** url du site de crypto, a delete après les test */
  url = 'https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=BTC&api_key=';
  /** Clé du site de crypto */
  apiKey = '31255fdff90cdeb050d6efa71f6e84917ed11d573e7dffcc76999f1c30ec58ab';

  /** Récupère des valeurs directement dpuis l'API, pour des test */
  public getDataFromApi() {
    return this.httpClient.get(this.url + this.apiKey );
  }

  /**
   * Creation d'une nouvelle crypto en base
   * @param body une crypto
   */
  public createCrypto(body: string) {
    return this.httpClient.post(this.URL + '/api/v0/cryptos/', body);
  }

  /**
   * Suppression d'une crypto du server
   * Ne pas confondre avec le remove de favoris dans user
   * @param idCrypto id de la crypto a delete
   */
  public deleteCrypto(idCrypto: string) {
    return this.httpClient.delete(this.URL + '/api/v0/cryptos/' + idCrypto );
  }

  /**
   * Récupération d'une crypto du server
   * @param idCrypto id de la crypto a get
   */
  public getCrypto(idCrypto: string) {
    return this.httpClient.get(this.URL + '/api/v0/cryptos/' + idCrypto );
  }

  /**
   * Récupération des prix d'une crypto
   * @param idCrypto id de la crypto a get
   */
  public getCryptoPrices(idCrypto: string) {
    return this.httpClient.get(this.URL + '/api/v0/cryptos/' + idCrypto + '/prices');
  }

  /**
   * Récupération de toute les cryptos
   * @param idCrypto id de la crypto a get
   */
  public getAllCryptos() {
    return this.httpClient.get<any[]>(this.URL + '/api/v0/cryptos/');
  }

  /**
   * Edition d'un ou plusieurs éléments d'un crypto
   * @param idCrypto id de la crypto a get
   * @param body les changements sur la crypto
   */
  public updateCrypto(idCrypto: string , body: string) {
    return this.httpClient.put(this.URL + '/api/v0/cryptos/', body);
  }

  /** Mise a jour de la liste des cryptos de la BDD */
  public updateCoinList() {
    return this.httpClient.get(this.URL + '/api/v0/coins/');
  }


  /**
   * constructeur du service, si premiere connection , on importe les crypto dans la BDD
   * @param httpClient pour la communication avec les APIs
   */
  constructor(private httpClient: HttpClient) {
    console.log(localStorage.getItem('baseUpdated'));
    if (localStorage.getItem('baseUpdated') === null) {
      this.updateCoinList().subscribe((data) => {
        localStorage.setItem('baseUpdated', 'true');
      });
    }
  }
}
