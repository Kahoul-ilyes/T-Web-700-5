import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RssService } from '../shared/rss.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef} from "@angular/material/dialog";

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

  constructor(
    public dialogRef: MatDialogRef<AddRssComponent>,
    private fb: FormBuilder, private rssService: RssService, private snackBar: MatSnackBar) {}

  save() {
    // call addrss service method
    let datas = this.addRssForm.value

    if (datas.url && datas.fetchable) {
      this.rssService.addRss(JSON.stringify({url: datas.url, isFetchable: Boolean(datas.fetchable)})).subscribe(res => {
        if (res['msg']) {
          this.refreshRss.emit(null)
          // display dialog to validate the add
          this.snackBar.open(res['msg']);
        } else if (res['err']) {
          // display dialog to validate the add
          this.snackBar.open(res['err']);
        }
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
