import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
})
export class EmptyDataComponent implements OnInit {

  perIcon: IconName = 'calendar-range';
  permisosTitle = {
    title: 'Permisos',
    message: '',
    color: '--permisos-accent',
    icon: this.perIcon,
  };
  @Input() tipoDocumento: string = '';
  url: string = '';
  constructor() {

  }

  ngOnInit() {
    switch (this.tipoDocumento) {
      case 'permisos': this.url = '../../../assets/img/empty/empty-permisos.png';
        break;
    }
  }

}
