
export class CryptoListElement {
  isTradable: boolean;
  id: string;
  name: string;
  v: number;
  createdAt: string;
  dateAvailability: string;
  logo: string;
  symbol: string;
  updatedAt: string;
  website: string;

  constructor(isTradable , id, name , v, createdAt , dateAvailability, logo, symbol, updatedAt, website) {
    this.isTradable = isTradable;
    // tslint:disable-next-line:variable-name
    this.id = id;
    this.name = name;
    // tslint:disable-next-line:variable-name
    this.v = v;
    this.createdAt = createdAt;
    this.dateAvailability = dateAvailability;
    this.logo = logo;
    this.symbol = symbol;
    this.updatedAt = updatedAt;
    this.website = website;
  }

}
