import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ArticleService} from '../shared/article.service';
import {ArticleModel} from '../shared/article.model';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  article = new ArticleModel('', '', '', '', '', '', '');
  display: boolean;
  constructor(  private route: ActivatedRoute,
                private router: Router, private articleService: ArticleService) { }

  ngOnInit() {
    this.display = false;
    const id = this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(id).subscribe(
      res => {
        // @ts-ignore
        const articleRes  = res.article;

        // tslint:disable-next-line:max-line-length
        this.article = new ArticleModel(articleRes.title, '', articleRes['content:encoded'], articleRes.pubDatedate, articleRes.image, articleRes._id, articleRes.link);
        this.display = true;
        console.log('result get by id' , res);
      });
  }

}
