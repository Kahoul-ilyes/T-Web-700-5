import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth.service';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {UserService} from '../../user/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';




@Component({
  selector: 'app-crypto-page',
  templateUrl: './crypto-page.component.html',
  styleUrls: ['./crypto-page.component.scss']
})
export class CryptoPageComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  cryptoOnPage: CryptoModel[];
  cryptoSymbolDisplayed = '';
  displayedColumns: string[];
  /** Colonnes affichées */

  /** Values du bouton de
   * @var color sa couleur
   * @var checked son état
   */
  color = 'primary';
  checked = true;
  /** Liste Affichée une fois filtré */
  cryptoListAllUsers: CryptoModel[];

  cryptoListFavorites: CryptoModel[];

  /** Liste complète de toute les cryptos */
  cryptoListFull: CryptoModel[];
  /** Systeme d'affichage d'angular mat */
  dataSourceAllUsers = new MatTableDataSource(this.cryptoListAllUsers);
  dataSourceFavorites = new MatTableDataSource(this.cryptoListFavorites);

  displayFav = false;
  /** permet d'acceder aux cryptos displayed */
  pageEvent: PageEvent;
  private suscription: Subscription;


  ngOnInit() {
    this.displayedColumns = ['acronym', 'name', 'logo', 'value', 'capitalization', 'evolution', 'favorite'];

    this.dataSourceAllUsers.paginator = this.paginator;
    this.cryptoListAllUsers = new Array<CryptoModel>();
    this.cryptoListFull = new Array<CryptoModel>();
    this.cryptoListFavorites = new Array<CryptoModel>();


    this.cryptoService.getAllCryptos().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListFull.push( new CryptoModel(d.isTradable, d.isAvailable, d._id, this.cryptoListFull.length, d.name,
          d.__v, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }
      this.initDataSource();
    });
  }



  /**
   * Initialise la liste pour diffuser les cryptos dans le bon ordre
   */
  initDataSource() {
    this.filterList();
    this.sortList();

    this.dataSourceAllUsers = new MatTableDataSource(this.cryptoListAllUsers);
    this.dataSourceFavorites = new MatTableDataSource(this.cryptoListFavorites);

    this.dataSourceAllUsers.paginator = this.paginator;
    this.paginator._changePageSize(25);
    this.onPageChange(null);

    // tslint:disable-next-line:no-shadowed-variable
    const timer = setInterval(() => this.refreshTable(), 10000);
    const timout = setTimeout(() => this.displayFavorites(), 4000);
  }


  displayFavorites() {
    this.refreshFavorites();
    this.displayFav = true;
  }



  // ######### Système de filtre ##############

  /**
   * Update toutes les 2 sec des datas affichées
   */
  refreshTable(): void {
    this.cryptoOnPage = this.dataSourceAllUsers._pageData(this.dataSourceAllUsers.data);
    const cryptoTab = new Array<string>();
    const cryptoRef = new Array<string>();

    this.cryptoOnPage.forEach((crypto, index) => cryptoTab[index] = crypto.symbol);
    this.cryptoOnPage.forEach((crypto) => cryptoRef[crypto.symbol] = crypto.idTab);
    this.cryptoService.getCryptosBySymbol(cryptoTab).subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListAllUsers[cryptoRef[d.symbol]].changeCryptoValue(d);
        this.dataSourceAllUsers.data = this.cryptoListAllUsers;
      }
    });
  }

  addCrypto(symbol: string) {
    this.userService.currentUser.addCrypto(symbol);
    // tslint:disable-next-line:max-line-length
    this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(res => console.log('update result' , res));

    this.refreshFavorites();
  }

  removeCrypto(symbol: string) {
    this.userService.currentUser.removeCrypto(symbol);
    // tslint:disable-next-line:max-line-length
    this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(res => console.log('update result' , res));
    this.refreshFavorites();
  }

  /** Applique des filtres sur la liste à afficher */
  filterList() {
    // this.cryptoListSort = this.cryptoListFull.filter((a, b) => a.currentPrice !== 0);
    this.cryptoListAllUsers = this.cryptoListFull;
    // tslint:disable-next-line:max-line-length
    this.cryptoListFavorites = this.cryptoListFull.filter(crypto => this.userService.currentUser.cryptos.includes(crypto.symbol));
    // console.log('favorites', this.cryptoListFavorites);
  }

  /** Tri de base, par capitalisation (prix* quantité) */
  sortList() {
    this.cryptoListAllUsers.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
    this.cryptoListFavorites.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
  }

  refreshFavorites() {
    this.cryptoListFavorites = this.cryptoListFull.filter(crypto => this.userService.currentUser.cryptos.includes(crypto.symbol));
    console.log('favoritesdata ', this.dataSourceFavorites);
    this.cryptoListFavorites = this.cryptoListFavorites.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
    this.dataSourceFavorites.data = this.cryptoListFavorites;
  }

  /** filtre les cryptos selon leur valeurs */
  isTradable(element: CryptoModel, index, array) {
    return (element.isTradable);
  }

  /** filtre les cryptos selon leur valeurs */
  isAvailable(element: CryptoModel, index, array) {
    return (element.isAvailable);
  }

  /** Filtre lié a l'input de recherche
   * TODO: Se lance 2 fois a chaque filtre, a corriger
   */
  applyInputFilter(target: EventTarget) {
    // @ts-ignore
    this.dataSourceAllUsers.filter = target.value.trim().toLowerCase();
    this.cryptoSymbolDisplayed = '';
    this.dataSourceAllUsers.filteredData.slice(0, 24).forEach(a => {
      if (a.symbol.length <= 8) {
        this.cryptoSymbolDisplayed += a.symbol + ',';
      }
    });
    this.cryptoService.subscribeCryptosTicker(this.cryptoSymbolDisplayed).subscribe(data2 => {
    });
  }

  /**
   * Fonction appelé a chaque changement de pages
   */
  onPageChange($event: PageEvent) {
    this.cryptoSymbolDisplayed = '';
    this.dataSourceAllUsers._pageData(this.dataSourceAllUsers.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
    this.cryptoService.subscribeCryptosTicker(this.cryptoSymbolDisplayed).subscribe(data2 => {
    });
  }


  constructor(public auth: AuthService, public cryptoService: CryptoService, public userService: UserService) { }

}
