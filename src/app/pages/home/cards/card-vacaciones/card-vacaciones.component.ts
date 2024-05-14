import { Component, OnInit } from '@angular/core';
import { VacacionesService } from '../../../../services/vacaciones.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-card-vacaciones',
  templateUrl: './card-vacaciones.component.html',
  styleUrls: ['./card-vacaciones.component.scss'],
})
export class CardVacacionesComponent implements OnInit {
  dias: number = 0;

  vacIcon: IconName = 'umbrella-beach';
  vacSection = {
    title: 'Vacaciones',
    message: 'No tienes documentos pendientes de aprobación',
    color: '--vacaciones-accent',
    icon: this.vacIcon,
  };
  constructor(public vacacionesService: VacacionesService) {}

  ngOnInit() {
    this.vacacionesService
      .getDiasDisponibles()
      .then((dias: any) => (this.dias = dias));
  }
}
