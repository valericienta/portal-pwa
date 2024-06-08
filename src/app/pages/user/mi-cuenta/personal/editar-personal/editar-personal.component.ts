import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.component.html',
  styleUrls: ['./editar-personal.component.scss'],
})
export class EditarPersonalComponent implements OnInit {
  @Input() personal: any[];
  @Input() emergencias: any[];
  sindatos: string = 'No informado';
  constructor(
    private modalController: ModalController,
    public toastService: ToastService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() { }

  disableInput(label: string) {
    if (label == 'Email' || label == 'RUT') {
      return true;
    } else {
      return false;
    }
  }

  private getFicha() {
    let ficha = {
      calle: this.personal.find(x => x.property == 'calle').value,
      telefono: this.personal.find(x => x.property == 'telefono').value,
      movil: this.personal.find(x => x.property == 'movil').value,
      eMail: this.personal.find(x => x.property == 'email').value,
      emergenciaContacto: this.emergencias.find(x => x.property == 'emergenciaContacto').value,
      emergenciaRelacion: this.emergencias.find(x => x.property == 'emergenciaRelacion').value,
      emergenciaTelefono: this.emergencias.find(x => x.property == 'emergenciaTelefono').value
    }
    ficha.calle = ficha.calle == this.sindatos ? '' : ficha.calle;
    ficha.telefono = ficha.telefono == this.sindatos ? '' : ficha.telefono;
    ficha.movil = ficha.movil == this.sindatos ? '' : ficha.movil;
    ficha.eMail = ficha.eMail == this.sindatos ? '' : ficha.eMail;
    ficha.emergenciaContacto = ficha.emergenciaContacto == this.sindatos ? '' : ficha.emergenciaContacto;
    ficha.emergenciaRelacion = ficha.emergenciaRelacion == this.sindatos ? '' : ficha.emergenciaRelacion;
    ficha.emergenciaTelefono = ficha.emergenciaTelefono == this.sindatos ? '' : ficha.emergenciaTelefono;
    return ficha;
  }

  async save() {
    //método para guardar datos cuando haya endpoint
    let data = this.getFicha();
    this.usuarioService.sendUpdate(data).then(data => {
      this.toastService.present('Informamos a RRHH sobre los cambios solicitados.', "success")
      
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
