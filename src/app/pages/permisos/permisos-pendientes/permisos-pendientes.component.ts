import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { AlertController } from '@ionic/angular';
import { Permiso } from 'src/app/interfaces/permiso.interface';
import { PermisosService } from 'src/app/services/permisos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-permisos-pendientes',
  templateUrl: './permisos-pendientes.component.html',
  styleUrls: ['./permisos-pendientes.component.scss'],
})
export class PermisosListaComponent implements OnInit {
  permisosPendientes: Permiso[];
  perIcon: IconName = 'calendar-range';
  permisosTitle = {
    title: 'Solicitudes de permisos',
    message: '',
    color: '--permisos-accent',
    icon: this.perIcon,
  };

  serviceInvoked = false;
  @Output() onRecordsCount = new EventEmitter<number>();

  constructor(
    public permisosService: PermisosService,
    private alertController: AlertController,
    public toastService: ToastService) {
    this.permisosPendientes = [];
  }

  ngOnInit() {
    this.getPermisos();
  }

  getPermisos() {
    return new Promise((resolve)=>{
      this.permisosService.getPermisosPendientes().then((data: Permiso[]) => {
        this.serviceInvoked = true;
        this.permisosPendientes = data;
        this.onRecordsCount.emit(data.length);
        this.setMensaje(data.length);
        resolve(data.length)
      });

    })
  }

  async alertaEliminarPermiso(id: any) {
    const alert = await this.alertController.create({
      header: '¿Quieres eliminar esta solicitud?',
      message: 'Esta acción es irreversible.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.eliminarPermiso(id);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarPermiso(id: any) {
    this.permisosService
      .eliminar(id)
      .then(() => {
        this.getPermisos();
      })
      .catch((error: any) => {
        this.toastService.present(JSON.stringify(error), 'danger');
      });
  }

  setMensaje(porFirmarLength: number) {
    if (porFirmarLength > 1)
      this.permisosTitle.message = `Tienes ${porFirmarLength} permisos pendientes de aprobación.`;
    else if (porFirmarLength == 1)
      this.permisosTitle.message = 'Tienes 1 permiso pendiente de aprobación.';
    else if (porFirmarLength == 0)
      this.permisosTitle.message = 'No tienes permisos pendientes de aprobación.';
  }
}
