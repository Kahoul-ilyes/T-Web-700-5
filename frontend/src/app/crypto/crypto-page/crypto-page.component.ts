import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth.service';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {UserService} from '../../user/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import { CurrencyService } from '../shared/currency.service';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-crypto-page',
  templateUrl: './crypto-page.component.html',
  styleUrls: ['./crypto-page.component.scss']
})
export class CryptoPageComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['logo', 'acronym', 'name', 'value', 'capitalization', 'evolution', 'favorite'];
  /** Colonnes affichées */

  /** Values du bouton de
   * @var color sa couleur
   * @var checked son état
   */
  color = 'primary';
  checked = true;
  /** Liste Affichée une fois filtré */
  private cryptoList: CryptoModel[] = [];
  private favoriteList: CryptoModel[] = [];

  cryptoToSubscribe: string[] = [];

  // Currency
  currencyCode = 'EUR';
  rate = 1.0;

  /** Systeme d'affichage d'angular mat */
  public dataSourceCryptos = new MatTableDataSource(this.cryptoList);
  public dataSourceFavorites = new MatTableDataSource(this.favoriteList);

  displayFav = false;

  // limit & offset for crypto list
  totalCryptosLength: Number = 0;
  limit: Number = 25;
  offset: Number = 0;
  available: Boolean = true;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 5, 10, 100];


  ngOnInit() {
    // update currency to use
    this.auth.userProfile$.subscribe(res => {
      if (res && res.sub) {
        // get user
        this.userService.getUser(res.sub).subscribe(res2 => {
          // get the user currency, call the currency converter api and change the rate
          // @ts-ignore
          if (res2 && res2.user && res2.user.user_metadata && res2.user.user_metadata.currency !== '' && res2.user.user_metadata.currency) {
            this.currencyService.getCurrencies().subscribe(res3 => {
              // @ts-ignore
              if (res3 && res3.currencies && this.currencyCode in res3.currencies) {
                // @ts-ignore
                this.currencyCode = res2.user.user_metadata.currency;
              } else {
                this.currencyCode = 'EUR';
              }
            });
          }
        });
      }
    });

    this.currencyService.getRate('USD', this.currencyCode).subscribe(res => {
      // @ts-ignore
      if (res && res.status === 'success') {
        // @ts-ignore
        this.rate = parseFloat(res.rates[this.currencyCode].rate);
      }
    });

    this.dataSourceCryptos.paginator = this.paginator;
    this.paginator.length = this.totalCryptosLength.valueOf();
    this.paginator._changePageSize(25);


    // tslint:disable-next-line:no-shadowed-variable
    const timer = setInterval(() => this.refreshTable(), 1000);
    const timout = setTimeout(() => this.refreshFavorites(), 2000);
  }

  private fetchCryptos() {
    this.cryptoList = [];

    this.cryptoService.countCryptos(true).subscribe(data => {
      // @ts-ignore
      this.totalCryptosLength = data.count;
    });

    // console.log(this.limit, this.offset);

    this.cryptoService.getAllCryptosWithParams(this.available, this.limit, this.offset).subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        // tslint:disable-next-line:max-line-length
        this.cryptoList.push( new CryptoModel(d.isTradable, d.isAvailable, d._id, d.name, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }

      this.dataSourceCryptos = new MatTableDataSource(this.cryptoList);
    });
    this.refreshFavorites();

  }


  /* displayFavorites() {
     this.refreshFavorites();
     this.displayFav = true;
   }*/

  getCryptosBySymbol(): string[] {
    const ret = [];

    for (const crypto of this.cryptoList) {
      if (crypto.symbol) { ret.push(crypto.symbol); }
    }

    return ret;
  }

  getCryptosBySymbolString(): string {
    let cryptoToSubscribe = '';
    for (const crypto of this.getCryptosBySymbol()) {
      if (crypto.length <= 8) {
        cryptoToSubscribe += crypto + ',';
      }
    }

    return cryptoToSubscribe;
  }

  // ######### Système de filtre ##############

  /**
   * Update toutes les 2 sec des datas affichées
   */
  refreshTable(): void {
    this.fetchCryptos();
  }

  addCrypto(symbol: string) {
    this.userService.currentUser.addCrypto(symbol);
    // tslint:disable-next-line:max-line-length
    this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(res => console.log('update result' , res));

    this.refreshFavorites();
    this.snackBar.open(symbol + ' added to favorites');

  }

  removeCrypto(symbol: string) {
    this.userService.currentUser.removeCrypto(symbol);
    // tslint:disable-next-line:max-line-length
    this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(res => console.log('update result' , res));
    this.refreshFavorites();
    this.snackBar.open(symbol + ' removed from favorites');
  }

  /** Applique des filtres sur la liste à afficher */
  filterList() {
    // this.cryptoListSort = this.cryptoListFull.filter((a, b) => a.currentPrice !== 0);
    // this.cryptoList = this.cryptoListFull;
    // tslint:disable-next-line:max-line-length
    this.favoriteList = this.cryptoList.filter(crypto => this.userService.currentUser.cryptos.includes(crypto.symbol));
    // console.log('favorites', this.favoriteList);
  }

  /** Tri de base, par capitalisation (prix* quantité) */
  sortList() {
    this.cryptoList.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
    this.favoriteList.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
  }

  refreshFavorites() {
    if (this.userService.currentUser.cryptos.length > 0) {
      this.cryptoService.getCryptosBySymbol(this.userService.currentUser.cryptos).subscribe(data => {
        this.favoriteList = new Array<CryptoModel>();
        // @ts-ignore
        for (const d of (data.cryptos)) {
          // tslint:disable-next-line:max-wline-length max-line-length
          this.favoriteList.push(new CryptoModel(d.isTradable, d.isAvailable, d._id, d.name, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
            d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
        }
        this.dataSourceFavorites = new MatTableDataSource(this.favoriteList);
      });
    }
  }

  /** filtre les cryptos selon leur valeurs */
  isTradable(element: CryptoModel, index, array) {
    return (element.isTradable);
  }

  /** filtre les cryptos selon leur valeurs */
  isAvailable(element: CryptoModel, index, array) {
    return (element.isAvailable);
  }

  // applyInputFilter(target: EventTarget) {
  //   // @ts-ignore
  //   this.dataSourceCryptos.filter = target.value.trim().toLowerCase();
  //   let cryptoToSubscribe = '';
  //   this.dataSourceCryptos.filteredData.slice(0, 24).forEach(a => {
  //     if (a.symbol.length <= 8) {
  //       cryptoToSubscribe += a.symbol + ',';
  //     }
  //   });
  //   this.cryptoService.subscribeCryptosTicker(cryptoToSubscribe).subscribe(data2 => {
  //   });
  // }

  /**
   * Fonction appelé a chaque changement de pages
   */
  onPageChange($event: PageEvent) {
    this.totalCryptosLength = $event.length;
    this.limit = $event.pageSize;
    this.offset = $event.pageIndex * $event.pageSize;

    this.cryptoList = [];

    this.cryptoService.countCryptos(true).subscribe(data => {
      // @ts-ignore
      this.totalCryptosLength = data.count;
    });

    // console.log(this.limit, this.offset);

    this.cryptoService.getAllCryptosWithParams(this.available, this.limit, this.offset).subscribe(data => {

      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        // tslint:disable-next-line:max-line-length
        this.cryptoList.push( new CryptoModel(d.isTradable, d.isAvailable, d._id, d.name, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }

      this.dataSourceCryptos = new MatTableDataSource(this.cryptoList);
      // subscribe ticker for crypto displayed
      this.cryptoService.subscribeCryptosTicker(this.getCryptosBySymbolString()).subscribe(data2 => {
      });
    });
  }


  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService, public cryptoService: CryptoService,
              public userService: UserService, public currencyService: CurrencyService,
              private snackBar: MatSnackBar
  ) { }

}
