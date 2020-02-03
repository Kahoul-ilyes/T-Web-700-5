import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  constructor(public article: ArticleService) { }

  displayedArticle = this.article.ARTICLETEST;
  keyWordsCollect = ['Test', 'Word', 'Words'];

  ngOnInit() {
  }

  reduceForm(content: string) {
    if (content.length < 80) {
      return content;
    } else {
      return content.substring(0, 75) + '...';
    }
  }
}
