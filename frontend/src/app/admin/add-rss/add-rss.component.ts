import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RssService } from '../shared/rss.service'

const URL_REGEXP = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-add-rss',
  templateUrl: './add-rss.component.html',
  styleUrls: ['./add-rss.component.scss']
})
export class AddRssComponent {
  addRssForm = this.fb.group({
    url: [null, [Validators.required, Validators.pattern(URL_REGEXP)]],
    fetchable: ['true', Validators.required]
  });

  @Output() refreshRss: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private rssService: RssService) {}

  save() {
    // call addrss service method
    let datas = this.addRssForm.value

    if (datas.url && datas.fetchable) {
      this.rssService.addRss(JSON.stringify({url: datas.url, isFetchable: Boolean(datas.fetchable)})).subscribe(res => {
        console.log(res)
        this.refreshRss.emit(null)
      })
    }
  }
}
