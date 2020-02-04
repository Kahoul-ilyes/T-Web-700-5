export class RssModel {
  id: string;
  isFetchable: boolean;
  url: string;

  constructor(id: string, isFetchable: boolean, url: string) {
    this.id = id;
    this.isFetchable = isFetchable;
    this.url = url;
  }

}
