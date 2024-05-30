import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  trabajador: Trabajador;
  personal: any;

  constructor(public global: GlobalService) {
    this.trabajador = this.global.trabajador;
    this.setPersonal();
  }

  ngOnInit() {}

  setPersonal() {
    this.personal = [
      {
        label: 'Dirección',
        value: this.trabajador.calle,
        icon: 'location-dot',
      },
      {
        label: 'Teléfono',
        value: this.trabajador.telefono ? this.trabajador.telefono : 'No tiene',
        icon: 'phone',
      },
      {
        label: 'Celular',
        value: this.trabajador.movil ? this.trabajador.movil : 'No tiene',
        icon: 'mobile',
      },
      {
        label: 'Email',
        value: this.trabajador.eMail,
        icon: 'envelope',
      },
      {
        label: 'RUT',
        value: this.trabajador.rut,
        icon: 'tag',
      },
    ];
  }
}
