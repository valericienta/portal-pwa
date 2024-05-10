export interface Documento {
    id?: string;
    fecha?: string;
    referencia?: string;
    idFicha?: number;
    rut?: string;
    nombre?: string;
    paterno?: string;
    materno?: string;
    fullName?: string;
    idTipo?: number;
    tipo?: string;
    formatoArchivo?: string;
    usoExterno?: boolean;
    requiereFirma?: boolean;
    aprobado?: boolean;
    firmado?: boolean;
    idEstado?:number;
    estado?: string;
    urlFirma?: string
    firmantes?: any[]
    creadoPor?: string;
    creadoEl?: string;
    creacion?: string;
    modificadoPor?: string;
    modificadoEl?: string;
    modificacion?: string;
}