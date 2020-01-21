import {Component, OnInit, ViewChild} from '@angular/core';
import {CryptoModel} from '../shared/crypto.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CryptoListElement} from '../shared/crypto-list-element.model';
import {CryptoService} from '../shared/crypto.service';

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
  dataSource = new MatTableDataSource(this.cryptoListDisplayed);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  refreshTable(): void{
    console.log(this.checked);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cryptoListDisplayed = new Array<CryptoListElement>();


    this.cryptoService.getAllCryptos().subscribe( data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        console.log(d.symbol);
        this.cryptoListDisplayed.push( new CryptoListElement(d.isTradable,  d._id, d.name,
          d.__v, d.createdAt , d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website));
      }
      console.log('fin');
      this.dataSource = new MatTableDataSource(      this.cryptoListDisplayed.sort((a, b) => a.v - b.v)
      );

      this.paginator._changePageSize(25);
      this.dataSource.paginator = this.paginator;

    });

  }

}

const CRYPTO_TEST: CryptoModel[] =
  [
    new CryptoModel('567897656zqdjqld',
      'Bitcoin',
      'BTC',
      'https://bitcoin.org/img/icons/logotop.svg?1577873163',
      'https://bitcoin.org/fr/',
      80000000000,
      79000000000,
      787000000000,
      85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    ),
    new CryptoModel('567897656zqdjqld',
      'Bitcoin',
      'BTC',
      'https://bitcoin.org/img/icons/logotop.svg?1577873163', 'https://bitcoin.org/fr/',
      80000000000,
      79000000000,
      787000000000,
      85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    ),    new CryptoModel('567897656zqdjqld',
    'Bitcoin',
    'BTC',
    'https://bitcoin.org/img/icons/logotop.svg?1577873163', 'https://bitcoin.org/fr/',
    80000000000,
    79000000000,
    787000000000,
    85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    ),    new CryptoModel('567897656zqdjqld',
    'Bitcoin',
    'BTC',
    'https://bitcoin.org/img/icons/logotop.svg?1577873163', 'https://bitcoin.org/fr/',
    80000000000,
    79000000000,
    787000000000,
    85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    ),
    new CryptoModel('567897656zqdjqld',
      'Bitcoin',
      'BTC',
      'https://bitcoin.org/img/icons/logotop.svg?1577873163', 'https://bitcoin.org/fr/',
      80000000000,
      79000000000,
      787000000000,
      85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    ),    new CryptoModel('567897656zqdjqld',
    'Bitcoin',
    'BTC',
    'https://bitcoin.org/img/icons/logotop.svg?1577873163', 'https://bitcoin.org/fr/',
    80000000000,
    79000000000,
    787000000000,
    85000000000),
    new CryptoModel(
      '5193bqzdiu68dbq',
      'Ethereum',
      'ETH',
      'https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png',
      'https://ethereum.org/fr/',
      2000000000,
      1900000000,
      1700000000,
      2100000000
    )
  ];
