import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss']
})
export class AddCryptoComponent {
  addCrytpoForm = this.fb.group({
    url: [null, Validators.required],
    fetchable: ['true', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  save() {
    // call add crypto service method
  }
}
