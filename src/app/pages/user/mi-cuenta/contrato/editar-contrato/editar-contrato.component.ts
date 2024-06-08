import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.scss'],
})
export class EditarContratoComponent implements OnInit {
  @Input() contrato: any[];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  disableInput(label: string) {
    if (label == 'Banco' || label == 'Cuenta corriente') {
      return false;
    } else {
      return true;
    }
  }

  async save() {
    //método para guardar datos cuando haya endpoint
    const toast = await this.toastController.create({
      message: 'Informamos a RRHH sobre los cambios solicitados.',
      color: 'success',
      duration: 2000,
      position: 'top',

      cssClass: 'custom-toast',
    });
    toast.present();
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
