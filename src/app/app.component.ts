import { Component, inject } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

import { UpdateStoresService } from './services/update-stores.service';
import { GlobalService } from './services/global.service';
import { menu } from './menu.config';
import { OneSignalService } from './services/onesignal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menucompleto = menu;
  gestion = menu.filter((x) => x.index > 0 && x.index < 5);
  documentos = menu.filter((x) => x.index >= 5);

  constructor(
    public platform: Platform,
    public menuController: MenuController,
    public global: GlobalService,
    public router: Router,
    public updates: UpdateStoresService,
    public onesignalService: OneSignalService) {
    this.platform.ready().then(() => {
      this.onesignalService.OneSignalInit();
    })

  }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      {
        App.getInfo().then((data) => {
          this.global.appVersion = data.version;
        });
      }
    }
  }

}
