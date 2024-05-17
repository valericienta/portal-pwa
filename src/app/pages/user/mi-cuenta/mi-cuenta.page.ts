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
  WA: boolean = false;
  SMS: boolean = false;

  segment = 'personal';

  constructor(
    public global: GlobalService,
    public modalCtrl: ModalController,
    public toastService: ToastService,
    public usuarioService: UsuarioService,
    public iab: InAppBrowser
  ) {
    this.WA = this.global.user.NotificationByWhatsApp == 'True' ? true : false;
    this.SMS = this.global.user.NotificationBySMS == 'True' ? true : false;
  }

  ngOnInit() {
    console.log('global', this.global);
  }

  setSegment(ev: any) {
    this.segment = ev.detail.value;
  }

  grabar() {
    this.usuarioService
      .setPreferences(this.SMS, this.WA)
      .then(() => {
        this.global.user.NotificationBySMS = this.SMS ? 'True' : 'False';
        this.global.user.NotificationByWhatsApp = this.WA ? 'True' : 'False';
        this.toastService.present(
          'Se han grabado exitosamente las preferencias',
          'success'
        );
      })
      .catch(() => {});
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
