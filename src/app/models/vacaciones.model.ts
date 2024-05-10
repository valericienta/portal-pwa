
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

    constructor(public values?: Object) {
        let avatarLetters= '';
        if (values) {
            Object.assign(this, values);
            switch (this.idTipo)
            {
                case 0: 
                avatarLetters='O';
                break;
                case 1: 
                avatarLetters='F+L';
                break;
                case 2: 
                avatarLetters='F+P';
                break;
                case 3: 
                avatarLetters='U+F';
                break;
                case 98: 
                avatarLetters='S+F';
                break;
                case 99: 
                avatarLetters='P+D';
                break;
            }
            this.avatar= `https://ui-avatars.com/api/?rounded=true&name=${avatarLetters}&size=64`;

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