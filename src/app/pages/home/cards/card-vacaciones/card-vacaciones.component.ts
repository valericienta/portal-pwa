import { Component, OnInit } from '@angular/core';
import { VacacionesService } from '../../../../services/vacaciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-vacaciones',
  templateUrl: './card-vacaciones.component.html',
  styleUrls: ['./card-vacaciones.component.scss'],
})
export class CardVacacionesComponent implements OnInit {
  dias: number = 0;
  constructor(public vacacionesService: VacacionesService) { }

  ngOnInit() {
  
      this.vacacionesService.getDiasDisponibles().then((dias: any) =>
        this.dias = dias)
  }

}
