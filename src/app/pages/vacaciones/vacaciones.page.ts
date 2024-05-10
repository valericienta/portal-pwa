import { Component, OnInit, ViewChild } from '@angular/core';
import { VacacionesService } from '../../services/vacaciones.service';
import { ModalController } from '@ionic/angular';
import { VacacionesSolicitarComponent } from './vacaciones-solicitar/vacaciones-solicitar.component';
import { VacacionesListaComponent } from './vacaciones-lista/vacaciones-lista.component';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.page.html',
  styleUrls: ['./vacaciones.page.scss'],
})
export class VacacionesPage implements OnInit {

  dias: number = 0;
  @ViewChild(VacacionesListaComponent, { static: false }) listaVacaciones: VacacionesListaComponent;
  constructor(public vacacionesService: VacacionesService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.mostrarDiasDisponibles('');
  }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: VacacionesSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.mostrarDiasDisponibles(null);
      if (this.listaVacaciones.tipo == "solicitudes") this.listaVacaciones.getSolicitudes();
    }
  }

  mostrarDiasDisponibles(event:any){
    this.vacacionesService.getDiasDisponibles().then((dias: any) =>
      this.dias = dias)
  }
}
