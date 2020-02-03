export class ArticleModel {

  title: string;
  author: string;
  content: string;
  date: string;
  image: string;
  constructor(title: string, author: string, content: string, date: string, image: string) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.date = date;
    this.image = image;
  }

}
