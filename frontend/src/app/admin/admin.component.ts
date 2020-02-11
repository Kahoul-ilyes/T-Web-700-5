import { Component, OnInit, Inject, ViewChild } from '@angular/core'

// import {AuthService} from '../auth.service'
import {RssModel} from './shared/rss.model'
import {RssService} from './shared/rss.service'
// import {UserService} from '../user/user.service'

import {MatTableDataSource} from '@angular/material/table'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

import { AddRssComponent } from './add-rss/add-rss.component' 
import { AddCryptoComponent } from './add-crypto/add-crypto.component' 
import { CryptoModel } from '../crypto/shared/crypto.model'
import { CryptoService } from '../crypto/shared/crypto.service'
// import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Rss table datas
  displayedColumnsRss: string[] = ['id', 'url', 'actions']
  rssArray: RssModel[] = []
  
  // Crypto table datas
  displayedColumnsCrypto: string[] = ['id', 'name', 'price', 'actions']
  cryptoArray: CryptoModel[] = []

  dataSourceRss = new MatTableDataSource(this.rssArray)
  dataSourceCrypto = new MatTableDataSource(this.cryptoArray)

  // limit & offset for crypto list
  totalCryptosLength: Number = 0
  limit: Number = 25
  offset: Number = 0
  available: Boolean = true
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 5, 10, 100];

  constructor(public rssService: RssService, public cryptoService: CryptoService, public dialogRss: MatDialog, public dialogCrypto: MatDialog) { }

  ngOnInit() {
    this.fetchAllRss()
    this.dataSourceCrypto.paginator = this.paginator;
    this.paginator.length = this.totalCryptosLength.valueOf()
    this.paginator._changePageSize(25);
  }

  /**
   * Fonction appelé a chaque changement de pages
   */
  onPageChange($event: PageEvent) {
    this.totalCryptosLength = $event.length
    this.limit = $event.pageSize
    this.offset = $event.pageIndex * $event.pageSize

    this.fetchAllCrypto()

  }

  /**
   * Fetch all rss
   */
  fetchAllRss() {
    this.rssArray = []
    this.rssService.getAllRss().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.rss)) {
        this.rssArray.push( new RssModel(d._id, d.isFetchable, d.url))
      }
      this.totalCryptosLength = this.rssArray.length
      this.dataSourceRss = new MatTableDataSource(this.rssArray)
    })
  }
  
  /**
   * Fetch all crypto by availabily, limit and offset
   */
  fetchAllCrypto() {
    this.cryptoArray = []
    this.cryptoService.countCryptos(true).subscribe(data => {
      this.totalCryptosLength = data['count']
    })
    
    this.cryptoService.getAllCryptosWithParams(this.available, this.limit, this.offset).subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoArray.push( new CryptoModel(d.isTradable, d.isAvailable, d._id, d.name, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }
      this.dataSourceCrypto = new MatTableDataSource(this.cryptoArray)
    });
  }

  /**
   * Set a flux RSS fetchable or unfetchable
   * @param id 
   * @param fetchable 
   */
  fetchRss(id: string, fetchable: boolean) {
    console.log(id)
    this.rssService.updateRss(id, JSON.stringify({ 'isFetchable': fetchable })).subscribe(res => {
      this.fetchAllRss()
    })
  }

  /**
   * Delete a RSS
   * @param id 
   */
  deleteRss(id: string) {
    this.rssService.deleteRss(id).subscribe(res => {
      this.fetchAllRss()
    })
  }

  /**
   * Set a crypto available or unavailable
   * @param id 
   * @param fetchable 
   */
  availableCrypto(id: string, available: boolean) {
    this.cryptoService.updateCrypto(id, JSON.stringify({ 'isAvailable': available })).subscribe(res => {
      this.fetchAllCrypto()
    })
  }

  /**
   * Delete a crypto
   * @param id 
   */
  deleteCrypto(id: string) {
    this.cryptoService.deleteCrypto(id).subscribe(res => {
      this.fetchAllCrypto()
    })
  }

  /**
   * Open the add rss dialog
   */
  openAddRssDialog(): void {
    const dialogRef = this.dialogRss.open(AddRssComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchAllRss()
    });
  }

  /**
   * Open the add crypto dialog
   */
  openAddCryptoDialog(): void {
    const dialogRef = this.dialogCrypto.open(AddCryptoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchAllCrypto()
    });
  }

}
