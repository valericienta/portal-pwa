import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Trabajador } from '../models/trabajador.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Tenants } from '../interfaces/tenants.interface';
import { GlobalService } from './global.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient, public global: GlobalService) {

  }

  async getusuario() {
    let url = "/fichas";
    const source$ = this.http.get(url).pipe(
      map((data: any) => {
        let trabajador = new Trabajador();
        Object.assign(trabajador, data.data);
        trabajador.defineAvatar();
        return trabajador;
      }))
    return await firstValueFrom(source$);
  }

  getTenants() {
    let url = "auth/tenants";
    const source$ = this.http.get<Tenants[]>(url).pipe(map((data: any) => data.data))
    return firstValueFrom(source$)
  }

  setPreferences(sms: boolean, wha: boolean) {
    let url = "/auth/preferences";
    let data = {
      id: this.global.trabajador.id,
      "notificationBySMS": sms,
      "notificationByWhatsApp": wha
    }
    const source$ = this.http.put(url, data);
    return firstValueFrom(source$)

  }

  getHabilitacion() {
    let url = '/auth/2fa';
    const source$ = this.http.get(url).pipe(map((data: any) => data.data));
    return firstValueFrom(source$)
  }

  sendUpdate(data: any){
    let url = `/fichas`;
    const source$ = this.http.put(url, data);
    return firstValueFrom(source$)
  }
}
