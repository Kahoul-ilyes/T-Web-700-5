
export class CryptoModel {
  isTradable: boolean;
  isAvailable: boolean;
  id: string;
  idTab: number;

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


public  changeCryptoValue(newCrypto: CryptoModel) {
  this.currentPrice = newCrypto.currentPrice;
  this.openingPrice = newCrypto.openingPrice;
  this.highestPrice = newCrypto.highestPrice;
  this.lowestPrice = newCrypto.lowestPrice;

}

  getChangesValue() {
    return ((this.currentPrice - this.openingPrice) / this.openingPrice) ;
  }

  /** renvois true si l'évolution est positive despuis le début de la session */
  isChangesPositive() {
    return (this.currentPrice - this.openingPrice) >= 0;
  }

  // tslint:disable-next-line:max-line-length
  constructor(isTradable , isAvailable, id, idTab,  name , v, createdAt , dateAvailability, logo, symbol, updatedAt, website, currentPrice, lowestPrice, openingPrice, highestPrice, supply, marketCap) {
    this.isTradable = isTradable;
    this.isAvailable = isAvailable;
    this.id = id;
    this.idTab = idTab;
    this.name = name;
    this.v = v;
    this.createdAt = createdAt;
    this.dateAvailability = new Date(dateAvailability as string);
    this.logo = logo;
    this.symbol = symbol;
    this.updatedAt = new Date(updatedAt as string);
    this.website = website;
    if (currentPrice !== undefined) {
      this.currentPrice = currentPrice;
      this.lowestPrice = lowestPrice;
      this.openingPrice = openingPrice;
      this.highestPrice = highestPrice;
      this.marketCap = marketCap;

    } else {
      this.currentPrice = 0;
      this.lowestPrice = 0;
      this.openingPrice = 0;
      this.highestPrice = 0;
      this.marketCap = 0;
    }
    this.supply = supply;
  }

}
