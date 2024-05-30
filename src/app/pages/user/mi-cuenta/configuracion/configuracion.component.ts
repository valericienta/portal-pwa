import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  WA: boolean = false;
  SMS: boolean = false;

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

  ngOnInit() {}

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
}
