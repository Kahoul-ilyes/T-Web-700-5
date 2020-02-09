import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rss',
  templateUrl: './add-rss.component.html',
  styleUrls: ['./add-rss.component.scss']
})
export class AddRssComponent {
  addRssForm = this.fb.group({
    url: [null, Validators.required],
    fetchable: ['true', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  save() {
    // call addrss service method
  }
}
