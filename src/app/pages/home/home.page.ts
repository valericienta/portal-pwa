import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingService } from '../../services/loading.service';

import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  trabajador = new Trabajador();

  constructor(
    public usuarioService: UsuarioService,
    public global: GlobalService,
    public menuController: MenuController,
    public loadingService: LoadingService,
    public modalCtrl: ModalController,
    public toastService: ToastService
  ) {

    this.trabajador = this.global.trabajador;
  }

  ngOnInit() {
    this.loadingService.isLoading.next(true)
    this.validateHabilitacion();

  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  validateHabilitacion() {
    if (!this.global.habilitadoFirma) {
      let entorno = '';

      let url = `https://app${entorno}.portaltrabajadores.cl/account/forgotpassword`;
      let message = `Recuerde habilitar le segundo nivel de autenticación para firmar los documentos`
      this.toastService.present_GoPortal(message, "danger")
    }
  }


}
