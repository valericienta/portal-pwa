import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Trabajador } from 'src/app/models/trabajador.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input() trabajador: Trabajador;

  liqIcon: IconName = 'file-contract';
  perIcon: IconName = 'calendar-range';
  certIcon: IconName = 'stamp';
  vacIcon: IconName = 'umbrella-beach';

  icons = [
    {
      name: 'Liquidaciones',
      color: '--liquidaciones-accent',
      icon: this.liqIcon,
      path: '/liquidaciones',
    },
    {
      name: 'Vacaciones',
      color: '--vacaciones-accent',
      icon: this.vacIcon,
      path: '/vacaciones',
    },
    {
      name: 'Permisos',
      color: '--permisos-accent',
      icon: this.perIcon,
      path: '/permisos',
    },
    {
      name: 'Certificados',
      color: '--certificados-accent',
      icon: this.certIcon,
      path: '/certificados',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
