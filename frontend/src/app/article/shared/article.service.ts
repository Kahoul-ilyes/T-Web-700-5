import { Injectable } from '@angular/core';
import {ArticleModel} from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  ListAllArticle = new Array<ArticleModel>();
  constructor() { }

   ARTICLETEST = [
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
     // tslint:disable-next-line:max-line-length
    new ArticleModel('Shiba Inu', 'Author ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
    new ArticleModel('Shiba Inu', 'Author ', 'My content ', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),
    new ArticleModel('Shiba Inu', 'Author ', 'My content ', '05/02/2020', 'https://material.angular.io/assets/img/examples/shiba1.jpg'),

  ];
}


