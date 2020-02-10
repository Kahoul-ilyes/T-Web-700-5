import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/** Access level root */
@Injectable({
  providedIn: 'root'
})
/** Gestion des appels a la parti crypto du server et   */
export class CurrencyService {

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
      "x-rapidapi-key": "a51b24621emsh7dbf63d09e9480fp1c4984jsna357ea3bc280"
    })
  };
  /** Main URL, a changer à la fin des test */
  URL = 'https://currency-converter5.p.rapidapi.com/currency/convert';

  /**
   * Récupération d'une crypto du server
   * @param idCrypto id de la crypto a get
   */
  public getRate(from: string, to: string) {
    return this.httpClient.get(this.URL + `?from=${from}&to=${to}`);
  }

  /**
   * constructeur du service, si premiere connection , on importe les crypto dans la BDD
   * @param httpClient pour la communication avec les APIs
   */
  constructor(private httpClient: HttpClient) {
  }
}
