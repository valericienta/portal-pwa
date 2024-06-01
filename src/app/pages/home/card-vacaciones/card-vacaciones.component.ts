import { Component, OnInit } from '@angular/core';
import { VacacionesService } from '../../../services/vacaciones.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Vacaciones } from 'src/app/models/vacaciones.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-vacaciones',
  templateUrl: './card-vacaciones.component.html',
  styleUrls: ['./card-vacaciones.component.scss'],
})
export class CardVacacionesComponent implements OnInit {
  dias = null;
  solicitudes: Vacaciones[];

  vacIcon: IconName = 'umbrella-beach';
  vacSection = {
    title: 'Vacaciones',
    message: '',
    color: '--vacaciones-accent',
    icon: this.vacIcon,
  };
  constructor(public vacacionesService: VacacionesService, public global: GlobalService) { }

  ngOnInit() {  }

  getDias() {
    this.vacacionesService
      .getDiasDisponibles()
      .then((dias: any) => (this.dias = dias));
  }

  setMessage(): string {
    if (this.solicitudes.length == 1) {
      return 'Tienes 1 solicitud pendiente de aprobación.';
    } else if (this.solicitudes.length > 1) {
      return (
        'Tienes ' +
        this.solicitudes.length +
        ' solicitudes pendientes de aprobación.'
      );
    } else {
      return 'No tienes solicitudes pendientes de aprobación.';
    }
  }

}
