import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PermisosSolicitarComponent } from './permisos-solicitar/permisos-solicitar.component';
import { PermisosListaComponent } from './permisos-pendientes/permisos-pendientes.component';
import { PermisosService } from 'src/app/services/permisos.service';


@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {
  @ViewChild(PermisosListaComponent, { static: false }) pendientes: PermisosListaComponent;

  constructor(
    public modalCtrl: ModalController,
    public permisosService: PermisosService) { }

  cntPendientes?: number;
  cntHistorial?: number;
  ngOnInit() { 
    this.cntHistorial = undefined;
    this.cntPendientes=undefined;
  }

  async modalSolicitar() {
    const modal = await this.modalCtrl.create({
      component: PermisosSolicitarComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0.75, 1]
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'save') {
      this.pendientes.getPermisos();
    }
  }

  getPermisos() {
    this.pendientes.getPermisos();
  }

  totalRecords(e: any, type: string) {
    if (type == 'pendientes') this.cntPendientes = e;
    else this.cntHistorial = e;
  }
}
