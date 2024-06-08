import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
  segment = 'personal';

  constructor(public global: GlobalService, public iab: InAppBrowser) {}

  ngOnInit() {
   
  }

  setSegment(ev: any) {
    this.segment = ev.detail.value;
  }
}
