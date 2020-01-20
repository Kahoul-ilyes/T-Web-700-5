/**
 * Classe qui mappe la structure des données recues de l'api
 */
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
  cryptos: string[];
  /** Mots clés lié a l'user */
  keywords: string[];



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
  hasKeyWords(): boolean {
    return this.keywords.length !== 0;
  }

  /** Renvois true si cryptos n'est pas vide */
  hasCryptos(): boolean {
    return this.cryptos.length !== 0;
  }
}
