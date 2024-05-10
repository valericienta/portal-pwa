import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-emergencias',
  templateUrl: './card-emergencias.component.html',
  styleUrls: ['./card-emergencias.component.scss'],
})
export class CardEmergenciasComponent implements OnInit {

  public trabajador : Trabajador;
  constructor(public global: GlobalService) {
    this.trabajador= global.trabajador;
   }

  ngOnInit() {}

}
