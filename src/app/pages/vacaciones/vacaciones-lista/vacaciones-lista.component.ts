import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vacaciones } from 'src/app/models/vacaciones.model';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-vacaciones-lista',
  templateUrl: './vacaciones-lista.component.html',
  styleUrls: ['./vacaciones-lista.component.scss'],
})
export class VacacionesListaComponent implements OnInit {
  solicitudes: Vacaciones[] = [];
  tipo: string;
  @Output() updateDiasEvent = new EventEmitter<string>();

  constructor(public vacacionesService: VacacionesService) { 
    this.solicitudes= [];
    this.tipo="solicitudes";
  }

  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.solicitudes = [];
    this.vacacionesService.getSolicitudes().then((data: Vacaciones[]) => {
      this.solicitudes = data;
    })
  }

  getVacaciones() {
    this.solicitudes = [];
    this.vacacionesService.getVacaciones().then((data: Vacaciones[]) => {
      this.solicitudes = data;
    })
  }

  eliminarSolicitud(id: string) {
    this.vacacionesService.eliminar(id)
      .then(() => {
        this.updateDiasEvent.emit('Se elimino la solicitud ');
       if ( this.tipo=="vacaciones") this.getVacaciones();
       else this.getSolicitudes();
      })
      .catch((error: any) => { console.log(error) })
  }
}
