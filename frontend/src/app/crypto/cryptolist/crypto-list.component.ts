import {Component, OnInit, ViewChild} from '@angular/core';
import {CryptoModel} from '../shared/crypto.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-cryptopage',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  displayedColumns: string[] = ['acronym', 'name', 'logo', 'value', 'evolution'];
  dataSource = new MatTableDataSource(CRYPTO_TEST);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

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
