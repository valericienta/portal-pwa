import { Component, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingService } from '../../services/loading.service';

import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastService } from 'src/app/services/toast.service';
import { CardVacacionesComponent } from './card-vacaciones/card-vacaciones.component';
import { CardEventosComponent } from './card-eventos/card-eventos.component';
import { CardPendientesComponent } from './card-pendientes/card-pendientes.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(CardVacacionesComponent) cardvacaciones: CardVacacionesComponent;
  @ViewChild(CardEventosComponent) cardeventos: CardEventosComponent;
  @ViewChild(CardPendientesComponent) cardpendientes: CardPendientesComponent;

  trabajador = new Trabajador();
  tramitependientes: boolean = true;
  cntdocumentospendientes: number = 0;
  pendientes: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public global: GlobalService,
    public menuController: MenuController,
    public loadingService: LoadingService,
    public modalCtrl: ModalController,
    public toastService: ToastService,
    private documentosService: DocumentosService
  ) {
    this.trabajador = this.global.trabajador;
  }

  ngOnInit() {
    this.menuController.enable(true);
    //this.validateHabilitacion();
  }

  async loadData() {
    this.cardvacaciones.getDias();
    this.cardeventos.getEventos();
    this.cardpendientes.getPendientesFirma();
    this.checkPendientes().then((data) => {
      this.tramitependientes = data;
    });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  validateHabilitacion() {
    if (!this.global.habilitadoFirma) {
      let entorno = '';
      let url = `https://app${entorno}.portaltrabajadores.cl/account/forgotpassword`;
      let message = `Recuerde habilitar le segundo nivel de autenticación para firmar los documentos`;
      this.toastService.present_GoPortal(message, 'danger');
    }
  }

  async checkPendientes(): Promise<boolean> {
    let cntsolicitudes =
      await this.documentosService.getCntSolicitudesPendientes();
    let cntpermisos = await this.documentosService.getCntPermisosPendientes();
    return cntsolicitudes + cntpermisos > 0 ? true : false;
  }
}
