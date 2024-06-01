import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingService } from '../../services/loading.service';

import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { searchResponse } from 'src/app/models/search-response.model';
import { CardVacacionesComponent } from './cards/card-vacaciones/card-vacaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(CardVacacionesComponent) cardvacaciones: CardVacacionesComponent;
  trabajador = new Trabajador();

  alDiaIcon: IconName = 'badge-check';

  alDiaSection = {
    title: '¡Estás al día!',
    message: 'No tienes documentos ni solicitudes pendientes.',
    color: '--aldia-accent',
    icon: this.alDiaIcon,
  };

  documentosPendientes: Documento[] = [];
  pagina: number = 0;
  constructor(
    public usuarioService: UsuarioService,
    public global: GlobalService,
    public menuController: MenuController,
    public loadingService: LoadingService,
    public modalCtrl: ModalController,
    public toastService: ToastService,
    private documentosService: DocumentosService) {
    this.trabajador = this.global.trabajador;
    this.pagina = 0;
  }

  ngOnInit() {
    this.validateHabilitacion();
    this.global.getTenant().subscribe((value) => {
      this.getPendientesHome();
    })
  }

  ionViewWillEnter() {
    this.menuController.enable(true);

  }

  validateHabilitacion() {
    if (!this.global.habilitadoFirma) {
      let entorno = '';
      let url = `https://app${entorno}.portaltrabajadores.cl/account/forgotpassword`;
      let message = `Recuerde habilitar le segundo nivel de autenticación para firmar los documentos`;
      this.toastService.present_GoPortal(message, 'danger');
    }
  }

  getPendientesHome(ev?: any) {
    this.pagina++;
    this.documentosPendientes = [];
    this.documentosService.getPendientesHome().then((data: searchResponse) => {
      data.data.forEach((item: Documento) => {
        this.documentosPendientes.push(item);
      });     
    });
  }

  onIonInfinite(ev: any) {
    this.getPendientesHome(ev);
  }
}
