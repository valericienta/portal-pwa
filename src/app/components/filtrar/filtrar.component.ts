import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from '@googlproxer/ion-range-calendar';
import { IonModal } from '@ionic/angular';
import { DynamicObject } from 'src/app/interfaces/dynamic-object.interface';
import * as moment from 'moment';
import { DocumentosService } from '../../services/documentos.service';


@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
})
export class FiltrarComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Output() getFilter = new EventEmitter<any>();
  public filtro: DynamicObject = {};
  public cntFiltros: number = 0;
  public porFirmar: boolean = false;
  public hasDate: boolean = false;
  public referencia: string = '';
  public tipo: number = -1;
  public tipos: any;
  type: 'string';
  dateRange: { from: string; to: string; };
  test: DayConfig[] = [];

  public optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    daysConfig: this.test,
    from: 1,
    to: 0
  };

  toggleItems: any =
    [
      { id: 0, opened: true, item: 'pendiente' },
      { id: 1, opened: false, item: 'fechas' },
      { id: 2, opened: false, item: 'tipos' },
      { id: 3, opened: false, item: 'referencia' },
    ]



  constructor(documentosService: DocumentosService) {
    documentosService.getTipos()
      .then(data => this.tipos = data)
  }

  ngOnInit() {
    this.cleanFilters();
  }


  showOptions() {

  }

  acceptFilters() {
    this.setFiltro();
  }

  ChangeOpened(idItem: number) {
    this.toggleItems[idItem].opened = !this.toggleItems[idItem].opened;
  }

  cleanFilters() {
    this.filtro = {};
    this.dateRange = { from: '', to: '' };
    this.hasDate = false;
    this.tipo = -1;
    this.referencia = '';
    this.porFirmar = false;
  }

  setFiltro(): any {
    this.filtro = {};
    let advancedFilter = [];
    if (this.porFirmar) this.filtro['firmado'] = false;
    if (this.tipo > 0) this.filtro['tipo'] = this.tipo;
    if (this.referencia) {
      advancedFilter.push({
        field: "nombre",
        operator: "contains",
        value: this.referencia
      });
    }
    if (this.dateRange.to != '') {
      advancedFilter.push({
        field: "fecha",
        operator: "gte",
        value: moment(this.dateRange.from).format('YYYY-MM-DD')
      });

      advancedFilter.push({
        field: "fecha",
        operator: "lte",
        value: moment(this.dateRange.to).format('YYYY-MM-DD')
      });
    }

    if (advancedFilter.length > 0)
    {
      this.filtro['advancedFilter'] = {
        logic: "and",
        filters: [...advancedFilter]
      };
    }

    this.getFilter.emit(this.filtro);
    this.cntFiltros = Object.keys(this.filtro).length;
    this.modal.dismiss();
  }

  openModal() {
    this.modal.present();
  }

}
