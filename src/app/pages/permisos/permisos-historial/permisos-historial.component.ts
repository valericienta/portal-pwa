import { Component, OnInit, ViewChild } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Permiso } from 'src/app/interfaces/permiso.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos-historial',
  templateUrl: './permisos-historial.component.html',
  styleUrls: ['./permisos-historial.component.scss'],
})
export class PermisosHistorialComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  permisosAprobados: Permiso[] = [];
  pagina: number = 0;

  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de permisos',
    message: 'Aquí encontraras todos tus permisos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };

  constructor(public permisosService: PermisosService) {}

  ngOnInit() {
    this.getHistorialPermisos();
  }

  getHistorialPermisos(ev?: any) {
    this.pagina++;
    this.permisosService
      .getPermisosHistorial(this.pagina, 4)
      .then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Permiso) => {
          this.permisosAprobados.push(item);
        });
        if (ev) this.infiniteScroll.complete();
      });
  }

  onIonInfinite(ev: any) {
    this.getHistorialPermisos(ev);
  }
}
