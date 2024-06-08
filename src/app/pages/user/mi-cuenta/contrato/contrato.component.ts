import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { EditarContratoComponent } from './editar-contrato/editar-contrato.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements OnInit {
  trabajador: any;
  contrato: any;

  constructor(
    public global: GlobalService,
    private modalCtrl: ModalController
  ) {
    this.trabajador = this.global.trabajador;
    this.setContrato();
  }

  ngOnInit() {}

  setContrato() {
    this.contrato = [
      {
        label: 'Tipo de contrato',
        value: this.trabajador.tipoContrato,
        icon: 'business-time',
      },
      {
        label: 'Jornada',
        value: this.trabajador.jornada,
        icon: 'clock',
      },
      {
        label: 'Sindicato',
        value: this.trabajador.sindicato,
        icon: 'briefcase',
      },
      {
        label: 'Banco',
        value: this.trabajador.banco,
        icon: 'building-columns',
      },
      {
        label: 'Cuenta corriente',
        value: this.trabajador.numeroCtaCte,
        icon: 'piggy-bank',
      },
    ];
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditarContratoComponent,
      componentProps: {
        contrato: this.contrato,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
}
