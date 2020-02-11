import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from 'src/app/crypto/shared/crypto.service';
import {MatDialogRef} from "@angular/material/dialog";

const URL_REGEXP = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss']
})
export class AddCryptoComponent {
  addCryptoForm = this.fb.group({
    name: [null, Validators.required],
    symbol: [null, Validators.required],
    logo: [null, Validators.pattern(URL_REGEXP)],
    website: [null, Validators.pattern(URL_REGEXP)],
    supply: [0],
    marketCap: [0],
    tradable: ['true', Validators.required],
    available: ['true', Validators.required],
  });

  @Output() refreshCrypto: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddCryptoComponent>,
    private fb: FormBuilder, private cryptoService: CryptoService, private snackBar: MatSnackBar) {}

  save() {
    // call addrss service method
    let datas = this.addCryptoForm.value

    if (datas.name && datas.symbol && datas.tradable && datas.available) {
      this.cryptoService.createCrypto(JSON.stringify({name: datas.name, symbol: datas.symbol, logo: datas.logo, website: datas.website, supply: parseInt(datas.supply), marketCap: parseInt(datas.marketCap), isTradable: Boolean(datas.tradable), isAvailable: Boolean(datas.available) })).subscribe(res => {
        if (res['msg']) {
          this.refreshCrypto.emit(null)
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
