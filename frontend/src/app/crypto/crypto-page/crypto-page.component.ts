import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-crypto-page',
  templateUrl: './crypto-page.component.html',
  styleUrls: ['./crypto-page.component.scss']
})
export class CryptoPageComponent implements OnInit {

  constructor(public auth: AuthService, public cryptoService: CryptoService, public userService: UserService) { }

  cryptoListTotal = new Array<CryptoModel>();


  getCryptoUser() {
    return this.cryptoListTotal.filter((crypto) => this.userService.currentUser.cryptos.includes(crypto.symbol));

  }

  getAllCryptos() {
    return this.cryptoListTotal;
  }
  ngOnInit() {
    this.cryptoService.getAllCryptos().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListTotal.push( new CryptoModel(d.isTradable, d._id, this.cryptoListTotal.length, d.name,
          d.__v, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }
    });
  }
}
