import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PermisosSolicitarComponent } from './permisos-solicitar/permisos-solicitar.component';
import { PermisosListaComponent } from './permisos-lista/permisos-lista.component';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { PermisosService } from 'src/app/services/permisos.service';
import { Permiso } from 'src/app/interfaces/permiso.interface';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {
  @ViewChild(PermisosListaComponent, { static: false })
  listapermisos: PermisosListaComponent;

  constructor(
    public modalCtrl: ModalController,
    public permisosService: PermisosService
  ) {}

  ngOnInit() {
    // this.permisosService.getPermisos().then((data: Permiso[]) => {
    //   data.forEach((permiso) => {
    //     permiso.estado == 'Aprobado'
    //       ? this.permisosAprobados.push(permiso)
    //       : this.permisosPendientes.push(permiso);
    //   });
    //   this.setMensaje(this.permisosPendientes.length);
    // });
  }

  // public getPermisos() {
  //   this.permisosService.getPermisos().then((data: Permiso[]) => {
  //     data.forEach((permiso) => {
  //       permiso.estado == 'Aprobado'
  //         ? this.permisosAprobados.push(permiso)
  //         : this.permisosPendientes.push(permiso);
  //     });
  //     // this.permisos = data;
  //   });
  // }

  // eliminarPermiso(id: any) {
  //   this.permisosService
  //     .eliminar(id)
  //     .then(() => {
  //       this.getPermisos();
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: PermisosSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') this.listapermisos.getPermisos();
  }
}
