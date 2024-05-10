import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public usuarioService: UsuarioService,
    public global: GlobalService
  ) { }

  public toastButtons = [
    {
      text: 'Ir al Portal',
      role: 'info',
      handler: () => {
        this.abrirPortal();
      },
    }
  ];

  present(message: string, type: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500,
      cssClass: type + "-toast",
      position: 'top',
    }).then((toast) => toast.present())
  }

  present_GoPortal(message: string, type: string) {
    this.toastCtrl.create({
      message: message,
      cssClass: type + "-toast",
      position: 'top',
      duration: 1500,
      buttons: this.toastButtons
    }).then((toast) => toast.present())
  }

  abrirPortal() {
    let url = `https://app.portaltrabajadores.cl/${this.global.tenant}/profile`;
    url = 'https://app.portaltrabajadores.cl//profile'
    const browser = this.iab.create(url, '_blank', {
      location: 'yes',
      clearcache: 'yes',
      clearsessioncache: 'yes',
      hidenavigationbuttons: 'yes',
      hideurlbar: 'yes',
      fullscreen: 'yes'
    });
    browser.on('exit').subscribe(event => {
     this.checkTwoFA();
    })
  }

  checkTwoFA(){
    this.usuarioService.getHabilitacion().then((data) => {
      this.global.user.MFAByApp = data.mfaByApp ? "True" : "False";
      this.global.user.MFAByPhone = data.mfaByPhone ? "True" : "False";
      this.global.setHabilitadoValue();
    })
  }
}
