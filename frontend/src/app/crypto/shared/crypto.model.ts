
export class CryptoModel {
  isTradable: boolean;
  id: string;
  name: string;
  v: number;
  createdAt: string;
  dateAvailability: Date;
  logo: string;
  symbol: string;
  updatedAt: Date;
  website: string;
  /** Prix actuel */
  currentPrice: number;
  /** Prix d'achat récent le plus bas  */
  lowestPrice: number;
  /** Prix d'achat à l'ouverture de la session */
  openingPrice: number;
  /** Prix d'achat récent le plus élevée  */
  highestPrice: number;
    /** envois le pourcentage d'évolution de la valeur depuis le début de la session */
    supply: number;
  marketCap: number;


  getChangesValue() {
    return ((this.currentPrice - this.openingPrice) / this.openingPrice) ;
  }

  /** renvois true si l'évolution est positive despuis le début de la session */
  isChangesPositive() {
    return (this.currentPrice - this.openingPrice) >= 0;
  }


  // tslint:disable-next-line:max-line-length
  constructor(isTradable , id, name , v, createdAt , dateAvailability, logo, symbol, updatedAt, website, currentPrice, lowestPrice, openingPrice, highestPrice, supply, marketCap) {
    this.isTradable = isTradable;
    this.id = id;
    this.name = name;
    this.v = v;
    this.createdAt = createdAt;
    this.dateAvailability = new Date(dateAvailability as string);
    this.logo = logo;
    this.symbol = symbol;
    this.updatedAt = new Date(updatedAt as string);
    this.website = website;
    this.currentPrice = currentPrice;
    this.lowestPrice = lowestPrice;
    this.openingPrice = openingPrice;
    this.highestPrice = highestPrice;
    this.supply = supply;
    this.marketCap = marketCap;
  }

}
