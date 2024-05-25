import { Injectable } from '@angular/core';
import { Trabajador } from '../models/trabajador.model';
import { Usuario } from '../models/usuario.model';
import { Tenants } from '../interfaces/tenants.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user: Usuario;
  tenant: string;
  empresa: string;
  tenants: Tenants[];
  trabajador: Trabajador;
  habilitadoFirma: boolean = false;

  appVersion: string = '1.2.1 @ pwa';


  constructor() {

  }

  setHabilitadoValue() {
    this.habilitadoFirma = this.user.MFAByApp == "False" && this.user.MFAByPhone == "False" ? false : true;
  }
}
