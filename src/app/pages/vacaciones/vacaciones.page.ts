import { Component, OnInit, ViewChild } from '@angular/core';
import { VacacionesService } from '../../services/vacaciones.service';
import { ModalController } from '@ionic/angular';
import { VacacionesSolicitarComponent } from './vacaciones-solicitar/vacaciones-solicitar.component';
import { VacacionesListaComponent } from './vacaciones-lista/vacaciones-lista.component';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Vacaciones } from 'src/app/models/vacaciones.model';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.page.html',
  styleUrls: ['./vacaciones.page.scss'],
})
export class VacacionesPage implements OnInit {
  solicitudes: Vacaciones[] = [];
  historial: Vacaciones[] = [];

  vacIcon: IconName = 'umbrella-beach';
  vacationTitle = {
    title: 'Vacaciones',
    message: this.setMessage(),
    color: '--vacaciones-accent',
    icon: this.vacIcon,
  };

  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de vacaciones',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };

  dias: number = 0;

  tipo: string;
  // @Output() updateDiasEvent = new EventEmitter<string>();
  @ViewChild(VacacionesListaComponent, { static: false })
  listaVacaciones: VacacionesListaComponent;
  constructor(
    public vacacionesService: VacacionesService,
    public modalCtrl: ModalController
  ) {
    this.solicitudes = [];

    this.getSolicitudes();
    this.getVacaciones();
  }

  ngOnInit() {
    this.mostrarDiasDisponibles('');
  }

  setMessage(): string {
    if (this.solicitudes.length < 1) {
      return 'No hay solicitudes nuevas';
    } else {
      return (
        'Tienes ' +
        this.solicitudes.length +
        ' solicitudes pendientes de aprobación'
      );
    }
  }

  getSolicitudes() {
    this.solicitudes = [];
    this.vacacionesService.getSolicitudes().then((data: Vacaciones[]) => {
      this.solicitudes = data;
    });
  }

  getVacaciones() {
    this.solicitudes = [];
    this.vacacionesService.getVacaciones().then((data: Vacaciones[]) => {
      this.historial = data;
      console.log(this.historial);
    });
  }

  // eliminarSolicitud(id: string) {
  //   this.vacacionesService
  //     .eliminar(id)
  //     .then(() => {
  //       this.updateDiasEvent.emit('Se elimino la solicitud ');
  //       if (this.tipo == 'vacaciones') this.getVacaciones();
  //       else this.getSolicitudes();
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: VacacionesSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.mostrarDiasDisponibles(null);
      if (this.listaVacaciones.tipo == 'solicitudes')
        this.listaVacaciones.getSolicitudes();
    }
  }

  mostrarDiasDisponibles(event: any) {
    this.vacacionesService
      .getDiasDisponibles()
      .then((dias: any) => (this.dias = dias));
  }
}
