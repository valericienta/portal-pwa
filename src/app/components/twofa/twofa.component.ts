import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-2fa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss'],
})
export class TwoFAComponent implements OnInit {

  browser: any;
  constructor(
    public iab: InAppBrowser,
    public global: GlobalService,
    public usuarioService: UsuarioService) {
    //let url = `https://app.portaltrabajadores.cl/`;
    // "advancedFilter": {
    //   "logic": "string",
    //   "filters": [ "fecha"
    //     "string"
    //   ],
  }

  checkTwoFA(){
    this.usuarioService.getHabilitacion().then((data) => {
      this.global.user.MFAByApp = data.mfaByApp ? "True" : "False";
      this.global.user.MFAByPhone = data.mfaByPhone ? "True" : "False";
      this.global.setHabilitadoValue();
    })
  }
  
  ngOnInit() {
    this.checkTwoFA();
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
}
