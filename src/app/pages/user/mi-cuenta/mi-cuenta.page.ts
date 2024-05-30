import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
  segment = 'personal';

  constructor(public global: GlobalService, public iab: InAppBrowser) {}

  ngOnInit() {
    console.log('global', this.global);
  }

  setSegment(ev: any) {
    this.segment = ev.detail.value;
  }

  redirectClave() {
    let entorno = '';
    if (environment.dev) entorno = '-test';
    let url = `https://app${entorno}.portaltrabajadores.cl/account/forgotpassword`;
    url = 'https://app.portaltrabajadores.cl/';
    let browser = this.iab.create(url);
    browser.show();
  }
}
