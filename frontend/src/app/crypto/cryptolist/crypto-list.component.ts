import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CryptoModel} from '../shared/crypto.model';
import {CryptoService} from '../shared/crypto.service';
import {Target} from '@angular/compiler';


@Component({
  selector: 'app-cryptopage',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
      this.updateCurrentDisplay();
    });
  }

  initDataSource() {
    this.filterList();
    this.dataSource = new MatTableDataSource(this.cryptoListDisplayed);
    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(25);
  }

  updateCurrentDisplay() {
    this.cryptoSymbolDisplayed = '';
    this.dataSource._pageData(this.dataSource.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
    console.log('data shown ?' + this.cryptoSymbolDisplayed );

    this.cryptoService.subscribeCryptosTicker( this.cryptoSymbolDisplayed).subscribe( data2 => {
      console.log('Second Call', data2);
    });
  }

  // ######### Système de filtre ##############

  /** Call a chaque clic sur le bouton 'Trading only' */
  refreshTable(): void {
    console.log(this.checked);
    /*this.cryptoSymbolDisplayed ='';
    this.dataSource._pageData(this.dataSource.data).forEach(a => this.cryptoSymbolDisplayed += a.symbol + ',');
    console.log('data shown ?' + this.cryptoSymbolDisplayed ); */
  }

  /** Applique des filtres sur la liste à afficher */
  filterList() {
    this.cryptoListDisplayed =     this.cryptoListFull.sort((a, b) => b.marketCap - a.marketCap);
  }

  /** filtre les cryptos selon leur valeurs */
  isTradable(element: CryptoModel, index, array) {
    return (element.isTradable);
  }

  /** Filtre lié a l'input de recherche */
  applyInputFilter(target: Target) {
    // @ts-ignore
    this.dataSource.filter = target.value.trim().toLowerCase();
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
