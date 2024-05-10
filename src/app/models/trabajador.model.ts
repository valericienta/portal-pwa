import { Supervisor } from "../models/supervisor.model";

export class Trabajador {
  id: number;
  rut: string;
  nombre: string;
  paterno: string;
  materno: string;
  fullName: string;
  calle: string;
  comuna: string;
  ciudad: string;
  pais?: any;
  telefono?: any;
  movil?: any;
  eMail: string;
  urlFotografia: string;
  emergenciaContacto?: any;
  emergenciaRelacion?: any;
  emergenciaTelefono?: any;
  fechaContrato: string;
  idTipoContrato: number;
  tipoContrato: string;
  cargo: string;
  jornada: string;
  sucursal: string;
  sindicato: string;
  supervisor: string;
  supervisorEmail: string;
  supervisorTelefono: string;
  numeroCtaCte: string;
  banco: string;
  vigente: boolean;
  creadoPor: string;
  creadoEl: string;
  modificadoPor: string;
  modificadoEl: string;
  avatar: string ;
  
  constructor() {
   }
   
   defineAvatar(){
    this.avatar= `https://ui-avatars.com/api/?name=${this.nombre.charAt(0)}+${this.paterno.charAt(0)}&background=random&size=32`;
   }
}