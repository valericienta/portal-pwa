export interface Permiso {
  id?: string
  idFicha?: number
  rut?: string
  nombre?: string
  paterno?: string
  materno?: string
  idTipoPermiso?: number
  tipoPermiso?: string
  observaciones?: string
  desde?: string
  hasta?: string
  aprobado?: boolean
  aprobadoPor?: any
  aprobadoEl?: any
  utilizado?: boolean
  idEstado?: number
  estado?: string
  creadoPor?: string
  creadoEl?: string
  creacion?: string
  modificadoPor?: string
  modificadoEl?: string
}