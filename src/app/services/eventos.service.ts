import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs';
import { Evento } from '../interfaces/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(public http: HttpClient) { }

  getEventos() {
    let url = `/eventos`;
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data.map((item: any) => <Evento>item))))
    return firstValueFrom(source$)
  }
}
