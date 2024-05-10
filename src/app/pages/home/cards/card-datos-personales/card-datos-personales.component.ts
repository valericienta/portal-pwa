import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-datos-personales',
  templateUrl: './card-datos-personales.component.html',
  styleUrls: ['./card-datos-personales.component.scss'],
})
export class CardDatosPersonalesComponent implements OnInit {
  public trabajador: Trabajador;
  public supervisorEmail: string;
  public supervisorPhone: string;
  constructor(public global: GlobalService) {
    this.trabajador = this.global.trabajador;
    this.supervisorEmail = `mailto:${this.trabajador.supervisorEmail}`;
    this.supervisorPhone = `tel:+${this.trabajador.supervisorTelefono}`;
  }

  ngOnInit() {

  }

}
