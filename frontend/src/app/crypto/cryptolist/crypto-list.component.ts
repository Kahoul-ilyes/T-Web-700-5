import {Component, OnInit, ViewChild} from '@angular/core';
import {CryptoModel} from '../shared/crypto.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CryptoListElement} from '../shared/crypto-list-element.model';
import {CryptoService} from '../shared/crypto.service';
import {Target} from '@angular/compiler';

@Component({
  selector: 'app-cryptopage',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  constructor(private cryptoService: CryptoService) { }
  displayedColumns: string[] = ['acronym', 'name', 'logo' ];
  // , 'value', 'evolution'];

  /** Values du bouton de
   * @var color sa couleur
   * @var checked son état
   */
  color = 'primary';
  checked = true;

  cryptoListDisplayed: CryptoListElement[];
  cryptoListFull: CryptoListElement[];
  dataSource = new MatTableDataSource(this.cryptoListDisplayed);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  refreshTable(): void {
    console.log(this.checked);
  }

  /**
   * Applique des filtres sur la liste à afficher
   */
  filterList() {
    this.cryptoListDisplayed = this.cryptoListFull.filter(this.isTradable);
  }

  /** filtre les cryptos selon leur valeurs */
  isTradable(element: CryptoListElement, index, array) {
    return (element.isTradable);
  }

  applyInputFilter(target: Target) {
    // @ts-ignore
    this.dataSource.filter = target.value.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cryptoListDisplayed = new Array<CryptoListElement>();
    this.cryptoListFull = new Array<CryptoListElement>();
    this.cryptoService.getAllCryptos().subscribe( data => {

      // @ts-ignore cryptos n'est pas trouvé sinon
        for (const d of (data.cryptos)) {
          this.cryptoListFull.push(new CryptoListElement(d.isTradable, d._id, d.name,
            d.__v, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website));
        }
        this.filterList();
        console.log('list');
        console.log(this.cryptoListDisplayed);
        this.dataSource = new MatTableDataSource(this.cryptoListDisplayed);
        this.dataSource.paginator = this.paginator;
    });

    this.paginator._changePageSize(25);

    }

  }
