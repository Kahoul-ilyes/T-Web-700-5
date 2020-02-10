import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/article.service';
import {ArticleModel} from '../shared/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  constructor(public articleService: ArticleService) { }

  displayedArticle = new Array<ArticleModel>();
  keyWordsCollect = ['Test', 'Word', 'Words'];

  ngOnInit() {
    console.log('Article start');
    this.articleService.getArticlesByKeywords(null).subscribe(
      res => {
        console.log('return' , res);
        // @ts-ignore
        if (res.articles !== null && res.articles !== undefined) {
          // @ts-ignore
          for (const article of res.articles) {
            this.displayedArticle.push(new ArticleModel(article.title, '', article.content, article.date, article.image, article._id, article.link));
          }
        }
      });
  }

  firstText(content: string) {

    if (content.length < 80) {
      return content.split('p>')[1] + '.';
    } else {
      return content.split('p>')[1].slice(0, length - 2).split('.')[0] + '...';
    }
  }
}
