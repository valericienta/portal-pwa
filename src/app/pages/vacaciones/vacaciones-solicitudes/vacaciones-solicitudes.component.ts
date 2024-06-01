import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { AlertController, ModalController } from '@ionic/angular';
import { Vacaciones } from 'src/app/models/vacaciones.model';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-vacaciones-solicitudes',
  templateUrl: './vacaciones-solicitudes.component.html',
  styleUrls: ['./vacaciones-solicitudes.component.scss'],
})
export class VacacionesSolicitudesComponent implements OnInit {
  
  @Output() updatediasEvent = new EventEmitter<boolean>();

  solicitudes: Vacaciones[] = [];
  vacIcon: IconName = 'umbrella-beach';
  vacationTitle = {
    title: 'Vacaciones',
    message: '',
    color: '--vacaciones-accent',
    icon: this.vacIcon,
  };

  constructor(
    public vacacionesService: VacacionesService,
    public modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.solicitudes = [];
    this.vacacionesService.getSolicitudes().then((data: Vacaciones[]) => {
      this.solicitudes = data;
      this.vacationTitle.message = this.setMessage();
    });
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

  eliminarSolicitud(id: string) {
    this.vacacionesService
      .eliminar(id)
      .then(() => {
        this.updatediasEvent.emit(true);
        this.getSolicitudes();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async alertaEliminarSolicitud(id: any) {
    const alert = await this.alertController.create({
      header: '¿Quieres eliminar esta solicitud?',
      message: 'Esta acción es irreversible.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.eliminarSolicitud(id);
          },
        },
      ],
    });

    await alert.present();
  }
}
