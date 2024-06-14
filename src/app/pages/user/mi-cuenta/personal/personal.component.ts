import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  trabajador: Trabajador;
  personal: any;
  emergencias: any;
  sindatos: string = 'No informado';
  constructor(
    public global: GlobalService,
    private modalCtrl: ModalController
  ) {
    this.trabajador = this.global.trabajador;
    this.setPersonal();
    this.setEmergencias();
  }

  ngOnInit() { }

  setPersonal() {
    this.personal = [
      {
        label: 'Dirección',
        value: this.trabajador.calle,
        property: 'calle',
        icon: 'location-dot',
      },
      {
        label: 'Teléfono',
        value: this.trabajador.telefono,
        property: 'telefono',
        icon: 'phone',
      },
      {
        label: 'Celular',
        value: this.trabajador.movil,
        property: 'movil',
        icon: 'mobile',
      },
      {
        label: 'Email',
        value: this.trabajador.eMail,
        property: 'email',
        icon: 'envelope',
      },
      {
        label: 'RUT',
        value: this.trabajador.rut,
        property: 'rut',
        icon: 'tag',
      },
    ];
    console.log(this.personal)
  }

  setEmergencias() {
    this.emergencias = [
      {
        label: 'Nombre',
        value: this.trabajador.emergenciaContacto,
    
        property: 'emergenciaContacto',
        icon: 'user',
      },
      {
        label: 'Relación',
        value: this.trabajador.emergenciaRelacion,
        property: 'emergenciaRelacion',
        icon: 'family',
      },
      {
        label: 'Teléfono',
        value: this.trabajador.emergenciaTelefono,
        property: 'emergenciaTelefono',
        icon: 'phone',
      },
    ];
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditarPersonalComponent,
      componentProps: {
        personal: this.personal,
        emergencias: this.emergencias,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
}
