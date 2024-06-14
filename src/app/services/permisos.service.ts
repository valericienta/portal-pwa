import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs';
import { TiposPermiso } from '../interfaces/tipos-permiso.interface';
import { Permiso } from '../interfaces/permiso.interface';
import { searchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  constructor(public http: HttpClient, public global: GlobalService) { }

  getTipos() {
    let url = `/permisos/tipos`;
    const source$ = this.http
      .get(url)
      .pipe(
        map((response: any) =>
          response.data.map((item: any) => <TiposPermiso>item)
        )
      );
    return firstValueFrom(source$);
  }

  getPermisosHistorial(page?: number, size?: number) {
    let url = `/permisos/search`;
    let filtro = {
      orderby: ['desde DESC'],
      pageNumber: page,
      pageSize: size,
      utilizado: true
    };
    const source$ = this.http
      .post(url, filtro)
      .pipe(map((response: any) => <searchResponse>response));
    return firstValueFrom(source$);
  }

  getPermisosPendientes() {
    let url = `/permisos/search`;
    let filtro = {
      utilizado: false,
      orderby: ['desde DESC'],
    };
    const source$ = this.http
      .post(url, filtro)
      .pipe(
        map((response: any) => response.data.map((item: any) => <Permiso>item))
      );
    return firstValueFrom(source$);
  }

  solicitar(permiso: Permiso) {
    let url = `/permisos/`;
    let data = {
      idTipoPermiso: permiso.idTipoPermiso,
      desde: permiso.desde,
      hasta: permiso.hasta,
      observaciones: permiso.observaciones,
    };
    const source$ = this.http.post(url, data);
    return firstValueFrom(source$);
  }

  eliminar(id: string) {
    let url = `/permisos/${id}`;
    const source$ = this.http.delete(url);
    return firstValueFrom(source$);
  }

  getCantidadPermisosPendientes() {
    let url = '/permisos/pendientes'
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data)))
    return firstValueFrom(source$)
  }
}
