import { Component, OnInit } from '@angular/core';
import {CryptoService} from '../shared/crypto.service';

@Component({
  selector: 'app-crypto-graph',
  templateUrl: './crypto-graph.component.html',
  styleUrls: ['./crypto-graph.component.scss']
})
export class CryptoGraphComponent implements OnInit {

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    /*this.cryptoService.getDataFromApi().subscribe((data) =>{
      console.log(data);
    });*/

  }

}
