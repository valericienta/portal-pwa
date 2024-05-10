import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento.interface';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-card-eventos',
  templateUrl: './card-eventos.component.html',
  styleUrls: ['./card-eventos.component.scss'],
})
export class CardEventosComponent implements OnInit {

  eventos: Evento[] = [];
  constructor(public eventosService: EventosService) {
    this.eventosService.getEventos().then((data: Evento[]) => {
      this.eventos = data;
    })
  }

  ngOnInit() { }



}
