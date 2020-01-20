/**
 * Classe qui mappe la structure des données recues de l'api
 */
export class CryptoModel {
  /** id unique de la crypto ( fourni back) */
  id: string;
  /** Nom complet */
  name: string;
  /** Acronyme ( 3 lettres max) */
  acronym: string;
  /** Lien vers une image */
  logo: string;
  /** Lien vers un site web  */
  website: string;
  /** Prix actuel */
  currentPrice: number;
  /** Prix d'achat récent le plus bas  */
  lowestPrice: number;
  /** Prix d'achat à l'ouverture de la session */
  openingPrice: number;
  /** Prix d'achat récent le plus élevée  */
  highestPrice: number;


  /**
   * Constructeur complet
   */
   constructor(id, name, acronym, logo, website, currentPrice, lowestPrice, openingPrice, highestPrice) {
    this.id = id;
    this.name = name;
    this.acronym = acronym, this.currentPrice = currentPrice;
    this.lowestPrice = lowestPrice;
    this.openingPrice = openingPrice;
    this.highestPrice = highestPrice;
    this.logo = logo;
    this.website = website;
  }

  /**
   * renvois le pourcentage d'évolution de la valeur depuis le début de la session
   */
  getChangesValue() {
    return ((this.currentPrice - this.openingPrice) / this.openingPrice) * 100;
  }

  /**
   * renvois true si l'évolution est positive despuis le début de la session
   */
    isChangesPositive() {
    return (this.currentPrice - this.openingPrice) >= 0;
  }
}
