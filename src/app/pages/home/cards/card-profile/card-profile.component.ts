import { Component, Input, OnInit } from '@angular/core';
import { User } from '@codetrix-studio/capacitor-google-auth';
import { Trabajador } from 'src/app/models/trabajador.model';
import { Usuario } from 'src/app/models/usuario.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent implements OnInit {

  constructor(public global: GlobalService) { }
  trabajador: Trabajador;


  ngOnInit() {
    this.trabajador = this.global.trabajador;
  }

}
