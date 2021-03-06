import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/article.service';
import {ArticleModel} from '../shared/article.model';
import {UserService} from '../../user/user.service';
import {MatOptionSelectionChange} from '@angular/material/core';
import {Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  keywordsSelected = new Array<string> ();
  newKeyword: string;
  constructor(public articleService: ArticleService, public userService: UserService, public auth : AuthService,  private snackBar: MatSnackBar) { }

  displayedArticle = new Array<ArticleModel>();
  keyWordsCollect = this.userService.currentUser.keywords;

  ngOnInit() {
    console.log('Article start');
    this.articleService.getArticlesByKeywords(null).subscribe(
      res => {
        console.log('return' , res);
        // @ts-ignore
        if (res.articles !== null && res.articles !== undefined) {
          // @ts-ignore
          for (const article of res.articles) {
            // tslint:disable-next-line:max-line-length
            this.displayedArticle.push(new ArticleModel(article.title, '', article.content, article.date, article.image, article._id, article.link));
          }
        }
      });

    this.auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO) {
        this.userService.getUser(userAuthO.sub).subscribe(res => {
          // @ts-ignore
          this.keyWordsCollect = res.user.user_metadata.keywords;
        });
      }
    });
  }

  removeKeyword(keyword: string) {
    if (this.keywordsSelected.includes(keyword)) {
      this.keywordsSelected.splice(this.keywordsSelected.lastIndexOf(keyword), 1);
    }

    this.userService.currentUser.removeKeyword(keyword);
    console.log('keywords', this.userService.currentUser.keywords);
    // tslint:disable-next-line:max-line-length
    this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(
      res => console.log('update user' , res));
    this.keyWordsCollect = this.userService.currentUser.keywords;
    this.snackBar.open(keyword + ': this topic have been removed from favorites');
    this.refreshArticleList();

  }
  addKeyword() {
    this.keyWordsCollect = this.userService.currentUser.keywords;

    console.log('keyword added', this.newKeyword);
    if (this.newKeyword.trim().length > 0 && !this.userService.currentUser.containsKeyWords(this.newKeyword)) {
      console.log('keywords pass');
      this.userService.currentUser.addKeyword(this.newKeyword);
      this.userService.updateUser(this.userService.currentUser.id, this.userService.currentUser.toJSON()).subscribe(res => console.log('update user' , res));
      this.snackBar.open(this.newKeyword + ': this topic have been removed from favorites');

    }
    this.newKeyword = '';
  }

  refreshTable(event: MatOptionSelectionChange) {
    const eventKeyWord = event.source.viewValue.split(' close')[0];
    console.log('current key word', eventKeyWord);
    if (this.keywordsSelected.includes(eventKeyWord)) {
      this.keywordsSelected.splice(this.keywordsSelected.lastIndexOf(eventKeyWord), 1);
    } else {
      this.keywordsSelected.push(eventKeyWord);
    }
    this.refreshArticleList();
  }

  refreshArticleList() {

    this.articleService.getArticlesByKeywords(this.keywordsSelected.length === 0 ? null : this.keywordsSelected ).subscribe(
      res => {
        const newDisplayedArticle  = [];
        console.log('return' , res);
        // @ts-ignore
        if (res.articles !== null && res.articles !== undefined) {
          // @ts-ignore
          for (const article of res.articles) {
            // tslint:disable-next-line:max-line-length
            newDisplayedArticle.push(new ArticleModel(article.title, '', article.content, article.date, article.image, article._id, article.link));
          }
          this.displayedArticle = newDisplayedArticle;
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
