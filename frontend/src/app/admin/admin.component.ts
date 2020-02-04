import { Component, OnInit, Inject } from '@angular/core'

// import {AuthService} from '../auth.service'
import {RssModel} from './shared/rss.model'
import {RssService} from './shared/rss.service'
// import {UserService} from '../user/user.service'

import {MatTableDataSource} from '@angular/material/table'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface addRssDialogData {
  rssUrl: string;
  rssFetchable: boolean;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // Add rss dialog datas
  rssUrl: string
  rssFetchable: boolean

  // Rss table datas
  displayedColumnsRss: string[] = ['id', 'url', 'actions']
  rssArray: RssModel[] = []

  dataSourceRss = new MatTableDataSource(this.rssArray)

  constructor(public rssService: RssService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchAllRss()
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

  fetch(id: string, fetchable: boolean) {
    console.log(id)
    this.rssService.updateRss(id, JSON.stringify({ 'isFetchable': fetchable })).subscribe(res => {
      this.fetchAllRss()
    })
  }

  add(url: string, fetchable: boolean) {
    this.rssService.addRss(JSON.stringify({ 'url': url, 'isFetchable': fetchable })).subscribe(res => {
      this.fetchAllRss()
    })
  }

  delete(id: string) {
    this.rssService.deleteRss(id).subscribe(res => {
      this.fetchAllRss()
    })
  }
  

  // openAddRssDialog(): void {
  //   const dialogRef = this.dialog.open(addRssDialog, {
  //     width: '250px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log('result', result);

  //     // call add rss service
  //   });
  // }

}

// @Component({
//   selector: 'add-rss-dialog',
//   templateUrl: 'add-rss-dialog.html',
// })
// export class addRssDialog {

//   constructor(public dialogRef: MatDialogRef<addRssDialog>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
