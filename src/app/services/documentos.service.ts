import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs';
import { TiposCertificado } from '../interfaces/tipos-certificado.interface';
import { searchResponse } from '../models/search-response.model';



@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  pdfSrc: string;
  constructor(public http: HttpClient, public global: GlobalService) { }

  getLiquidaciones(page?: number, size?: number) {
    let filtro = {
      tipo: 6,
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha ASC"]
    }
    return this.search(filtro);
  }

  getLiquidacionesFirmadas(page?: number, size?: number) {
    let filtro = {
      tipo: 6,
      idEstado: 4,
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha ASC"]
    }
    return this.search(filtro);
  }

  getLiquidacionesPorFirmar(page?: number, size?: number) {
    let filtro = {
      tipo: 6,
      idEstado: 3,
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha ASC"]
    }
    return this.search(filtro);
  }

  getCertificados(page?: number, size?: number) {
    let filtro = {
      tipo: 4,
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha DESC"]
    }
    return this.search(filtro);
  }

  getDocumentosHistorial(page?: number, size?: number, filtros?: any) {
    let filtro = {
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha DESC"],
      idEstado: 4,
      excluirTipo: 6,
      advancedFilter: filtros
    }
    return this.search(filtro);
  }
  getDocumentosPendientesTodos() {
    let url = '/documentos/porfirmar';
    let source$ = this.http.get(url).pipe(map((response: any) => <searchResponse>response))
    return firstValueFrom(source$)
  }


  //SE USA EN HOME DONDE MOSTRAMOS INICIALMENTE LOS 5 PRIMEROS
  getPendientes(page?: number, size?: number) {
    let filtro = {
      pageNumber: page,
      pageSize: size,
      orderby: ["fecha ASC"],
      idEstado: 3
    }
    return this.search(filtro);
  }

  private search(filtro: any) {
    let url = `/documentos/search`;
    let source$ = this.http.post(url, filtro).pipe(map((response: any) => <searchResponse>response))
    return firstValueFrom(source$)
  }

  getFile(id: string) {
    let url = `/documentos/${id}/file`;
    const source$ = this.http.get(url, { responseType: 'blob' });
    return firstValueFrom(source$)
  }

  getTiposCertificados() {
    let url = `/certificados/tipos`;
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data.map((item: any) => <TiposCertificado>item))))
    return firstValueFrom(source$)
  }

  solicitarCertificado(idFormato: number) {
    let url = `/certificados/${idFormato}`;
    let filtro = {}
    const source$ = this.http.post(url, filtro).pipe(map((response: any) => response));
    return firstValueFrom(source$)
  }

  getCode(via: string, id: string) {
    let url = `/documentos/${id}/firmar/${via}`;
    const source$ = this.http.get(url);
    return firstValueFrom(source$)
  }

  firmar(via: string, id: string, code: string, coordinates: string) {
    let url = `/documentos/${id}/firmar/${via}/${code}`;
    const source$ = this.http.put(url, {}, { params: { location: coordinates } });
    return firstValueFrom(source$)
  }

  getTipos() {
    let url = '../../assets/data/tipos-documentos.json'
    const source$ = this.http.get(url);
    return firstValueFrom(source$)
  }

  getCntSolicitudesPendientes() {
    let url = `/vacaciones/solicitudes/pendientes`;
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data)));
    return firstValueFrom(source$)
  }

  getCntPermisosPendientes() {
    let url = `/permisos/pendientes`;
    const source$ = this.http.get(url).pipe(map(((response: any) => response.data)));
    return firstValueFrom(source$)
  }
}
