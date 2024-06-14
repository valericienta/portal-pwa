import { Injectable } from '@angular/core';
import { Trabajador } from '../models/trabajador.model';
import { Usuario } from '../models/usuario.model';
import { Tenants } from '../interfaces/tenants.interface';
import { BehaviorSubject, Observable } from 'rxjs';
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

  appVersion: string = '24.06.13';

  private tenantChange: BehaviorSubject<boolean>;

  constructor() {
    this.tenantChange = new BehaviorSubject<boolean>(false);
  }

  setHabilitadoValue() {
    this.habilitadoFirma = this.user.MFAByApp == "False" && this.user.MFAByPhone == "False" ? false : true;
  }

  setTenant(newValue: boolean): void {
    this.tenantChange.next(newValue);
  }

  getTenant(): Observable<boolean> {
    return this.tenantChange.asObservable();
  }
}
