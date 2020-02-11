export class ArticleModel {
  title: string;
  author: string;
  content: string;
  date: string;
  image: string;
  id: string;
  link: string;


  constructor(title: string, author: string, content: string, date: string, image: string, id: string, link: string) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.date = date;
    if (image.startsWith('https://upload.wikimedia.org')) {
      this.image = 'https://www.anaxago.com/uploads/media/froala/0001/64/d7d4f364bbf666f3e3fece51eb0ed4d745508af2.jpeg';
    } else
    this.image = image;
    this.id = id;
    this.link = link;
  }

}
