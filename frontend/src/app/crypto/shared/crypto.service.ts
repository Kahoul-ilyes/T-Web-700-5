import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/** Access level root */
@Injectable({
  providedIn: 'root'
})
/** Gestion des appels a la parti crypto du server et   */
export class CryptoService {

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'})
  };
  /** Main URL, a changer à la fin des test */
  URL = environment.apiBaseUrl;

  /**
   * Creation d'une nouvelle crypto en base
   * @param body une crypto
   */
  public createCrypto(body: string) {
    return this.httpClient.post(this.URL + '/api/v0/cryptos/', JSON.parse(body));
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
   */
  public getAllCryptos() {
    return this.httpClient.get<any[]>(this.URL + '/api/v0/cryptos/');
  }

  /**
   * Récupération de toute les cryptos available
   */
  public getAllCryptosAvailable() {
    return this.httpClient.get<any[]>(this.URL + '/api/v0/cryptos?available=true');
  }

  /**
   * Récupération de toute les cryptos with params
   */
  public getAllCryptosWithParams(available: Boolean = true, limit: Number = 25, offset: Number = 0) {
    return this.httpClient.get<any[]>(this.URL + `/api/v0/cryptos?available=${available}&limit=${limit}&offset=${offset}`);
  }

  public countCryptos(available: Boolean = true) {
    return this.httpClient.get<any[]>(this.URL + `/api/v0/cryptos/count?available=${available}`);
  }

  /**
   * Récupération des cryptos dont l'id est fourni
   * @param idCrypto id de la crypto a get
   */
  public getCryptosBySymbol(tabCryptos: string[]) {
    let cryptosRequest = '';
    tabCryptos.forEach((symbol) => cryptosRequest += symbol + ',');
    return this.httpClient.get<any[]>(this.URL + '/api/v0/cryptos?cryptos=' + cryptosRequest);
  }

  /**
   * Ajoute les cryptos au systeme de subscribe pour avoir les données en temps réels
   */
  public subscribeCryptosTicker(cryptoSuscribed: string) {
    return this.httpClient.get<any[]>(this.URL + '/api/v0/cryptos/subscribe?cryptos=' + cryptoSuscribed);
  }



  /**
   * Edition d'un ou plusieurs éléments d'un crypto
   * @param idCrypto id de la crypto a get
   * @param body les changements sur la crypto
   */
  public updateCrypto(idCrypto: string , body: string) {
    return this.httpClient.put(this.URL + `/api/v0/cryptos/${idCrypto}`, JSON.parse(body));
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
    //  if (localStorage.getItem('baseUpdated') === undefined) {
    //    console.log(localStorage.getItem('baseUpdated'));
    //    this.updateCoinList().subscribe((data) => {
    //       localStorage.setItem('baseUpdated', 'true');
    //     });
    // }
  }
}
