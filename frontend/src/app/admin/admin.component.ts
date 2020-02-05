import { Component, OnInit, Inject, ViewChild } from '@angular/core'

// import {AuthService} from '../auth.service'
import {RssModel} from './shared/rss.model'
import {RssService} from './shared/rss.service'
// import {UserService} from '../user/user.service'

import {MatTableDataSource} from '@angular/material/table'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AddRssComponent } from './add-rss/add-rss.component' 
import { CryptoModel } from '../crypto/shared/crypto.model';
import { CryptoService } from '../crypto/shared/crypto.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // Rss table datas
  displayedColumnsRss: string[] = ['id', 'url', 'actions']
  rssArray: RssModel[] = []
  
  // Crypto table datas
  displayedColumnsCrypto: string[] = ['id', 'name', 'price', 'actions']
  cryptoArray: CryptoModel[] = []

  dataSourceRss = new MatTableDataSource(this.rssArray)
  dataSourceCrypto = new MatTableDataSource(this.cryptoArray)

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public rssService: RssService, public cryptoService: CryptoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchAllRss()
    // this.fetchAllCrypto()
  }

  fetchAllRss() {
    this.rssArray = []
    this.rssService.getAllRss().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.rss)) {
        this.rssArray.push( new RssModel(d._id, d.isFetchable, d.url))
      }
      this.dataSourceRss = new MatTableDataSource(this.rssArray)
    })
  }
  
  fetchAllCrypto() {
    this.cryptoArray = []
    this.cryptoService.getAllCryptos().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.cryptos)) {
        this.cryptoArray.push( new CryptoModel(d.isTradable, d.isAvailable, d._id, this.cryptoArray.length, d.name,
          d.__v, d.createdAt, d.dateAvailability, d.logo, d.symbol, d.updatedAt, d.website,
          d.currentPrice, d.lowestPrice, d.openingPrice, d.highestPrice, d.supply, d.marketCap));
      }
      this.dataSourceCrypto = new MatTableDataSource(this.cryptoArray)
    });
  }

  fetchRss(id: string, fetchable: boolean) {
    console.log(id)
    this.rssService.updateRss(id, JSON.stringify({ 'isFetchable': fetchable })).subscribe(res => {
      this.fetchAllRss()
    })
  }

  addRss(url: string, fetchable: boolean) {
    this.rssService.addRss(JSON.stringify({ 'url': url, 'isFetchable': fetchable })).subscribe(res => {
      this.fetchAllRss()
    })
  }

  deleteRss(id: string) {
    this.rssService.deleteRss(id).subscribe(res => {
      this.fetchAllRss()
    })
  }
  

  openAddRssDialog(): void {
    const dialogRef = this.dialog.open(AddRssComponent, {
      width: '250px'
    });
  }

}
