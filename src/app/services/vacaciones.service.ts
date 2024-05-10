import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { firstValueFrom, map } from 'rxjs';
import { Vacaciones } from 'src/app/models/vacaciones.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  constructor(public http: HttpClient, public global: GlobalService) { }

  getDiasDisponibles() {
    let url = `/vacaciones/disponibles`;
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data)))
    return firstValueFrom(source$)
  }


  getSolicitudes() {
    let url = `/vacaciones/solicitudes/search`;
    let source$ = this.http.post(url, {}).pipe(map(((response: any) => response.data.map((item: any) => new Vacaciones(item)))))
    return firstValueFrom(source$)
  }

  getVacaciones() {
    let url = `/vacaciones/search`;
    let data = { idFicha: this.global.trabajador.id }
    let source$ = this.http.post(url, data).pipe(map(((response: any) => response.data.map((item: any) => new Vacaciones(item)))))
    return firstValueFrom(source$)
  }

  solicitar(data: any) {
    data.idFicha = this.global.trabajador.id;
    let url = `/vacaciones/solicitudes`;
    const source$ = this.http.post(url, data).pipe(map(((response: any) => response.data)))
    return firstValueFrom(source$)
  }

  eliminar(id: string) {
    let url = `/vacaciones/solicitudes/${id}`;
    const source$ = this.http.delete(url);
    return firstValueFrom(source$)
  }

}
