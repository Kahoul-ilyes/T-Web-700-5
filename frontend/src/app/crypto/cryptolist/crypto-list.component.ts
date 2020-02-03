import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../auth.service';
import {UserService} from '../../user/user.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-cryptopage',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  @Input()favorites: boolean;

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
  cryptoListSort: CryptoModel[];
  /** Liste complète */
  cryptoListFull: CryptoModel[];
  /** Systeme d'affichage d'angular mat */
  dataSource = new MatTableDataSource(this.cryptoListSort);

  /** permet d'acceder aux cryptos displayed */
  pageEvent: PageEvent;
  private suscription: Subscription;


  ngOnInit() {
    this.displayedColumns = ['acronym', 'name', 'logo', 'value', 'capitalization', 'evolution', 'favorite'];



    this.dataSource.paginator = this.paginator;
    this.cryptoListSort = new Array<CryptoModel>();
    this.cryptoListFull = new Array<CryptoModel>();

    this.cryptoService.getAllCryptos().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListFull.push( new CryptoModel(d.isTradable, d._id, this.cryptoListFull.length, d.name,
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
    this.dataSource = new MatTableDataSource(this.cryptoListSort);
    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(25);
    this.onPageChange(null) ;



    this.cryptoListSort.forEach((crypto, index) => crypto.idTab = index);

    // tslint:disable-next-line:no-shadowed-variable
    const timer = setInterval(() => this.refreshTable(), 2000);
  }

  // ######### Système de filtre ##############

  /**
   * Update toutes les 2 sec des datas affichées
   */
  refreshTable(): void {
    this.cryptoOnPage = this.dataSource._pageData(this.dataSource.data);
    const cryptoTab = new Array<string>();
    const cryptoRef = new Array<string>();

    this.cryptoOnPage.forEach((crypto, index) => cryptoTab[index] = crypto.symbol);
    this.cryptoOnPage.forEach((crypto) => cryptoRef[crypto.symbol] = crypto.idTab);
    this.cryptoService.getCryptosBySymbol(cryptoTab).subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListSort[cryptoRef[d.symbol]] = new CryptoModel(d.isTradable, d._id, cryptoRef[d.symbol], d.name,
          d.__v, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap);
        this.dataSource.data = this.cryptoListSort;
      }
    });
  }

  addCrypto(symbol: string) {

    this.userService.currentUser.addCrypto(symbol);
    this.filterList();
  }

  removeCrypto(symbol: string) {
    this.userService.currentUser.removeCrypto(symbol);
    this.filterList();
  }

  /** Applique des filtres sur la liste à afficher */
  filterList() {
    if (this.favorites) {
      this.suscription = this.userService.currentUser.cryptos$.subscribe((a) => {
        console.log('tab', a);
        this.cryptoListSort = this.cryptoListFull.filter((crypto) => a.includes(crypto.symbol));
      });
    } else {
       this.cryptoListSort = this.cryptoListFull.filter((a, b) => a.currentPrice !== 0);
       this.cryptoListSort = this.cryptoListFull;
    }
  }

  /** Tri de base, par capitalisation (prix* quantité) */
  sortList() {
    this.cryptoListSort = this.cryptoListSort.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
  }

  /** filtre les cryptos selon leur valeurs */
  isTradable(element: CryptoModel, index, array) {
    return (element.isTradable);
  }

  /** Filtre lié a l'input de recherche
   * TODO: Se lance 2 fois a chaque filtre, a corriger
   */
  applyInputFilter(target: EventTarget) {
    // @ts-ignore
    this.dataSource.filter = target.value.trim().toLowerCase();
    this.cryptoSymbolDisplayed = '';
    this.dataSource.filteredData.slice(0, 24).forEach(a => {
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
    this.dataSource._pageData(this.dataSource.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
    this.cryptoService.subscribeCryptosTicker(this.cryptoSymbolDisplayed).subscribe(data2 => {
    });
  }

  constructor(private cryptoService: CryptoService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    ,         public auth: AuthService, public userService: UserService, ) {

    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }
}


// Cimetiere de code

// Du code pour faire une websocket

/* this.socket$ = new WebSocketSubject('http://localhost:3000/api/v0/cryptos/subscribe?cryptos=BTC', null);


 private socket$: WebSocketSubject<Message>;

this.socket$
  .subscribe(
    (message) => console.log('test', message), // this.serverMessages.push(message) && this.scroll(),
    (err) => console.error(err),
    () => console.warn('Completed!')
  );

});*/
