import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PermisosSolicitarComponent } from './permisos-solicitar/permisos-solicitar.component';
import { PermisosListaComponent } from './permisos-lista/permisos-lista.component';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {

  @ViewChild(PermisosListaComponent, { static: false }) listapermisos: PermisosListaComponent;
  
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: PermisosSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') 
       this.listapermisos.getPermisos();
  }

}
