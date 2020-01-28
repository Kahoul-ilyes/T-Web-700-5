import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoListComponent } from './cryptolist/crypto-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule} from '@angular/material/table';
// tslint:disable-next-line:import-spacing
import {MatFormFieldModule } from   '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// For Http request
import {HttpClientModule} from '@angular/common/http';
import { CryptoGraphComponent } from './crypto-graph/crypto-graph.component';
import {CryptoService} from './shared/crypto.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

/**
 * Module pour tout ce qui concerne les crypto, affichage des listes de crypto et des stats
 */
@NgModule({
  declarations: [CryptoListComponent, CryptoGraphComponent],
  exports: [
    CryptoListComponent,
    HttpClientModule
  ],
    imports: [
        CommonModule,
        MatSliderModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatSortModule,
        MatIconModule
    ]
})
export class CryptoModule {

  constructor(private cryptoService: CryptoService) { }
}
