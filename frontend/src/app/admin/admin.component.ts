import { Component, OnInit } from '@angular/core';

// import {AuthService} from '../auth.service';
import {RssModel} from './shared/rss.model';
import {RssService} from './shared/rss.service';
// import {UserService} from '../user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumnsRss: string[] = ['id', 'url', 'actions']
  rssArray: RssModel[] = []

  constructor(public rssService: RssService) { }

  ngOnInit() {
    this.rssService.getAllRss().subscribe(data => {
      // @ts-ignore cryptos n'est pas trouvé sinon
      for (const d of (data.rss)) {
        this.rssArray.push( new RssModel(d._id, d.isFetchable, d.url));
      }
    });
  }

}
