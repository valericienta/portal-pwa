
export class Vacaciones {
    id: string
    idTipo: number
    tipo: string
    desde: string
    hasta: string
    dias: number
    observaciones: any
    creadoPor: string
    creadoEl: string
    creacion: string
    modificadoPor: string
    modificadoEl: string
    modificacion: string
    avatar: string
    aprobada: boolean
    estado: string

    constructor(public values?: Object) {
        if (values) {
            Object.assign(this, values);
         if (this.aprobada===false) this.estado = 'Pendiente';
         if (this.aprobada===true) this.estado = 'Pendiente RRHH';

        }

    }

    // public enum TipoVacacion : int
    // {
    //     [Description("Abono - Otros")]
    //     AbonoOtros = 0,
    //     [Description("Abono - Feriado Legal")]
    //     AbonoFeriadoLegal = 1,
    //     [Description("Abono - Feriado Progresivo")]
    //     AbonoFeriadoProgresivo = 2,
    //     [Description("Cargo - Uso Feriado")]
    //     CargoUsoFeriado = 3,
    //     [Description("Solicitud de Feriado")]
    //     Solicitud = 98,
    //     [Description("Provisión de Días")]
    //     ProvisionDias = 99
    // }


}