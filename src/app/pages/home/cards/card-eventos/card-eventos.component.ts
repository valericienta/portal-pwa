import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Evento } from 'src/app/interfaces/evento.interface';
import { EventosService } from 'src/app/services/eventos.service';
import { GlobalService } from 'src/app/services/global.service';
import { register } from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-card-eventos',
  templateUrl: './card-eventos.component.html',
  styleUrls: ['./card-eventos.component.scss'],
})
export class CardEventosComponent implements OnInit {
  eventos: Evento[];

  eventosIcon: IconName = 'calendar';

  eventosSection = {
    title: 'Próximos eventos',
    message: 'Cumpleaños, festividades, feriados y más.',
    color: '--eventos-accent',
    icon: this.eventosIcon,
  };

  constructor(public eventosService: EventosService, public global: GlobalService) {
   
  }

  ngOnInit() {
    this.getEventos();
    this.global.getTenant().subscribe(() => {
      this.getEventos();
    });
  }

  getEventos() {
    this.eventos=[];
    this.eventosService.getEventos().then((data: Evento[]) => {
      this.eventos = data;
    });
  }
}
