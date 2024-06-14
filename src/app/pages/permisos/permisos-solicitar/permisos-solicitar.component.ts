import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  CalendarComponentOptions,
  DayConfig,
} from '@googlproxer/ion-range-calendar';
import { ModalController } from '@ionic/angular';
import { Permiso } from 'src/app/interfaces/permiso.interface';
import { TiposPermiso } from 'src/app/interfaces/tipos-permiso.interface';
import { PermisosService } from 'src/app/services/permisos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-permisos-solicitar',
  templateUrl: './permisos-solicitar.component.html',
  styleUrls: ['./permisos-solicitar.component.scss'],
})
export class PermisosSolicitarComponent implements OnInit {
  @Output() dismissChange = new EventEmitter<any>();
  dateRange: { from: string; to: string };
  type: 'string';

  test: DayConfig[] = [];
  tipos: TiposPermiso[] = [];
  public optionsRange: CalendarComponentOptions = {
    from: new Date().setDate(new Date().getDate() + 1),
    pickMode: 'range',
    daysConfig: this.test,
  };

  permiso: Permiso = {
    idTipoPermiso: 0,
    observaciones: '',
    desde: '',
    hasta: '',
  };

  constructor(
    public permisosService: PermisosService,
    public toastService: ToastService,
    public modalCtrl: ModalController
  ) {
    this.getTipos();
  }

  ngOnInit() {}

  getTipos() {
    this.permisosService.getTipos().then((data) => {
      this.tipos = data;
    });
  }

  solicitar() {
    this.permiso.desde = this.dateRange.from;
    this.permiso.hasta = this.dateRange.to;
    this.permisosService
      .solicitar(this.permiso)
      .then((data: any) => {
        if (data) this.modalCtrl.dismiss(null, 'save');
        else
          this.toastService.present(
            'Se ha producido un error al registrar la solicitud',
            'danger'
          );
      })
      .catch((error) => {
        this.toastService.present(
          'Se ha producido un error al registrar la solicitud',
          'danger'
        );
      });
  }

  dismiss() {
    this.dismissChange.emit();
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
