import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Vacaciones } from 'src/app/models/vacaciones.model';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-vacaciones-historial',
  templateUrl: './vacaciones-historial.component.html',
  styleUrls: ['./vacaciones-historial.component.scss'],
})
export class VacacionesHistorialComponent  implements OnInit {
  
  historial: Vacaciones[] = [];
  histIcon: IconName = 'history';
  loaddata = false;
  historialTitle = {
    title: 'Historial de vacaciones',
    message: 'Aquí encontrarás el historial de vacaciones.',
    color: '--historial-accent',
    icon: this.histIcon,
  };
  
  constructor(public vacacionesService: VacacionesService) { }
  ngOnInit() {
    this.loaddata = false;
    this.getHistorial();
  }

  getHistorial() {
    this.vacacionesService.getVacaciones().then((data: Vacaciones[]) => {
      this.loaddata=true;
      this.historial = data;  
    });
  }

}
