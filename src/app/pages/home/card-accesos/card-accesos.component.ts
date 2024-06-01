import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Trabajador } from 'src/app/models/trabajador.model';

@Component({
  selector: 'app-card-accesos',
  templateUrl: './card-accesos.component.html',
  styleUrls: ['./card-accesos.component.scss'],
})
export class CardAccesosComponent implements OnInit {
  @Input() trabajador: any;

  icons = [
    {
      name: 'Liquidaciones',
      color: '--liquidaciones-accent',
      avatar: 'avatar-liq',
      path: '/liquidaciones',
    },
    {
      name: 'Vacaciones',
      color: '--vacaciones-accent',
      avatar: 'avatar-vac',
      path: '/vacaciones',
    },
    {
      name: 'Permisos',
      color: '--permisos-accent',
      avatar: 'avatar-per',
      path: '/permisos',
    },
    {
      name: 'Certificados',
      color: '--certificados-accent',
      avatar: 'avatar-cert',
      path: '/certificados',
    },
  ];

  constructor() {}

  ngOnInit() {
  
  }
}
