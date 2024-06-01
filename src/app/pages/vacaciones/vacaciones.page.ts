import { Component, OnInit, ViewChild } from '@angular/core';
import { VacacionesService } from '../../services/vacaciones.service';
import { ModalController } from '@ionic/angular';
import { VacacionesSolicitarComponent } from './vacaciones-solicitar/vacaciones-solicitar.component';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { VacacionesSolicitudesComponent } from './vacaciones-solicitudes/vacaciones-solicitudes.component';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.page.html',
  styleUrls: ['./vacaciones.page.scss'],
})
export class VacacionesPage implements OnInit {


  @ViewChild(VacacionesSolicitudesComponent) solicitudes: VacacionesSolicitudesComponent;


  dias: number = 0;

  constructor(
    public vacacionesService: VacacionesService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.mostrarDiasDisponibles('');
  }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: VacacionesSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'save') {
      this.mostrarDiasDisponibles(null);
      this.solicitudes.getSolicitudes();
    }
  }

  mostrarDiasDisponibles(event: any) {
    this.vacacionesService
      .getDiasDisponibles()
      .then((dias: any) => (this.dias = dias));
  }
}
