import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements OnInit {
  trabajador: any;
  contrato: any;

  constructor(public global: GlobalService) {
    this.trabajador = this.global.trabajador;
    this.setContrato();
  }

  ngOnInit() {}

  setContrato() {
    this.contrato = [
      {
        label: 'Tipo de contrato',
        value: this.trabajador.tipoContrato,
      },
      {
        label: 'Jornada',
        value: this.trabajador.jornada,
      },
      {
        label: 'Sindicato',
        value: this.trabajador.sindicato,
      },
      {
        label: 'Cuenta corriente',
        value: this.trabajador.numeroCtaCte,
      },
      {
        label: 'Supervisor',
        value: this.trabajador.supervisor,
      },
    ];
  }
}
