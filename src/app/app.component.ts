import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

import { menu } from './menu.config';
import { UpdateStoresService } from './services/update-stores.service';

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
  ) { }

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
