import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {Target} from '@angular/compiler';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-cryptopage',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  cryptoSymbolDisplayed = '';

  /** Colonnes affichées */
  displayedColumns: string[] = ['acronym', 'name', 'logo' , 'value', 'evolution'];

  /** Values du bouton de
   * @var color sa couleur
   * @var checked son état
   */
  color = 'primary';
  checked = true;
  /** Liste Affichée une fois filtré */
  cryptoListDisplayed: CryptoModel[];
  /** Liste complète */
  cryptoListFull: CryptoModel[];
  /** Systeme d'affichage d'angular mat */
  dataSource = new MatTableDataSource(this.cryptoListDisplayed);

  /** permet d'acceder aux cryptos displayed */
  pageEvent: PageEvent;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cryptoListDisplayed = new Array<CryptoModel>();
    this.cryptoListFull = new Array<CryptoModel>();

    this.cryptoService.getAllCryptos().subscribe( data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoListFull.push(new CryptoModel(d.isTradable, d._id, d.name,
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
    this.dataSource = new MatTableDataSource(this.cryptoListDisplayed);
    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(25);
  }

  // ######### Système de filtre ##############

  /** Call a chaque clic sur le bouton 'Trading only' */
  refreshTable(): void {
    /*this.cryptoSymbolDisplayed ='';
    this.dataSource._pageData(this.dataSource.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
  */
  }


  /** Applique des filtres sur la liste à afficher */
  filterList() {
   // this.cryptoListDisplayed = this.cryptoListFull.filter((a, b) => a.currentPrice !== 0);
     this.cryptoListDisplayed = this.cryptoListFull;
  }

  /** Tri de base, par capitalisation (prix* quantité) */
  sortList() {
    console.log('list not sorted' , this.cryptoListDisplayed);
    this.cryptoListDisplayed = this.cryptoListDisplayed.sort((a, b) =>
      b.currentPrice * b.marketCap - a.currentPrice * a.marketCap
    );
    console.log('list sorted' , this.cryptoListDisplayed);
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
    this.dataSource.filteredData.slice(0, 24).forEach(a => {if (a.symbol.length <= 8) {  this.cryptoSymbolDisplayed += a.symbol + ','; }});
    this.cryptoService.subscribeCryptosTicker( this.cryptoSymbolDisplayed).subscribe( data2 => {
    });
  }
  /**
   * Fonction appelé a chaque changement de pages
   */
  onPageChange($event: PageEvent) {
    this.cryptoSymbolDisplayed = '';
    this.dataSource._pageData(this.dataSource.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
    this.cryptoService.subscribeCryptosTicker( this.cryptoSymbolDisplayed).subscribe( data2 => {
    });
  }




  constructor(private cryptoService: CryptoService) {
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
