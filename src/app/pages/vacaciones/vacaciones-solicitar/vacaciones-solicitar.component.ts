import { Component, OnInit } from '@angular/core';
import {
  CalendarComponentOptions,
  DayConfig,
} from '@googlproxer/ion-range-calendar';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-vacaciones-solicitar',
  templateUrl: './vacaciones-solicitar.component.html',
  styleUrls: ['./vacaciones-solicitar.component.scss'],
})
export class VacacionesSolicitarComponent implements OnInit {
  dateRange: { from: string; to: string };
  type: 'string';

  test: DayConfig[] = [];
  public optionsRange: CalendarComponentOptions = {
    from: new Date().setDate(new Date().getDate() + 1),
    pickMode: 'range',
    daysConfig: this.test,
  };

  solicitud = {
    idTipoMovimiento: 3,
    observaciones: '',
    desde: '',
    hasta: '',
    dias: 0,
  };

  constructor(
    public modalController: ModalController,
    public vacacionesService: VacacionesService,
    public toastService: ToastService
  ) {
    this.solicitud.observaciones = '';
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  solicitar() {
    this.solicitud.desde = this.dateRange.from;
    this.solicitud.hasta = this.dateRange.to;
    this.vacacionesService.solicitar(this.solicitud).then((data: any) => {
      if (data) this.modalController.dismiss(null, 'save');
      else
        this.toastService.present(
          'Se ha producido un error al registrar la solicitud',
          'danger'
        );
    });
  }
}
