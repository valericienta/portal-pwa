import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CalendarComponentOptions,
  DayConfig,
} from '@googlproxer/ion-range-calendar';
import { IonModal, ModalController } from '@ionic/angular';
import { DynamicObject } from 'src/app/interfaces/dynamic-object.interface';
import * as moment from 'moment';
import { DocumentosService } from '../../../../services/documentos.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
})
export class FiltrarComponent implements OnInit {
  @Output() dismissChange = new EventEmitter<any>();
  @Input() tipos: any[];
  @ViewChild(IonModal) modal: IonModal;

  currentFilter: [];
  // public tipos: any = [];
  public hasDate: boolean = false;
  public referencia: string = '';
  public tipo: number = -1;
  type: 'string';
  dateRange: { from: string; to: string };
  test: DayConfig[] = [];

  public optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    daysConfig: this.test,
    from: 1,
    to: 0,
  };

  toggleItems: any = [
    { id: 0, opened: true, item: 'pendiente' },
    { id: 1, opened: false, item: 'fechas' },
    { id: 2, opened: false, item: 'tipos' },
    { id: 3, opened: false, item: 'referencia' },
  ];

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.defineCurrentFilter();
  }

  ChangeOpened(idItem: number) {
    this.toggleItems[idItem].opened = !this.toggleItems[idItem].opened;
  }

  private defineCurrentFilter() {
    if (this.currentFilter.length > 0) {
      let tipo = this.currentFilter.find((x: any) => x.field == 'tipo');
      let referencia = this.currentFilter.find((x: any) => x.field == 'nombre');
      let fechas = this.currentFilter.filter((x: any) => x.field == 'fecha');
      this.tipo = tipo ? tipo['value'] : -1;
      this.referencia = referencia ? referencia['value'] : '';
      if (fechas.length > 0) {
        this.hasDate = true;
        let desde: any = fechas.find((x: any) => x.operator == 'gte');
        let hasta: any = fechas.find((x: any) => x.operator == 'lte');
        if (desde && hasta) {
          this.dateRange = { from: desde.value, to: hasta.value };
          this.hasDate = true;
        }
        console.log(this.dateRange);
      } else this.dateRange = { from: '', to: '' };
    } else {
      this.dateRange = { from: '', to: '' };
      this.hasDate = false;
      this.tipo = -1;
      this.referencia = '';
    }
  }

  public apply(): any {
    let advancedFilter = [];
    if (this.tipo > -1) {
      advancedFilter.push({
        field: 'tipo',
        operator: 'eq',
        value: this.tipo,
      });
    }
    if (this.referencia) {
      advancedFilter.push({
        field: 'nombre',
        operator: 'contains',
        value: this.referencia,
      });
    }
    if (this.dateRange.to != '') {
      advancedFilter.push({
        field: 'fecha',
        operator: 'gte',
        value: moment(this.dateRange.from).format('YYYY-MM-DD'),
      });

      advancedFilter.push({
        field: 'fecha',
        operator: 'lte',
        value: moment(this.dateRange.to).format('YYYY-MM-DD'),
      });
    }
    console.log(advancedFilter);
    this.dismissChange.emit();
    this.modalCtrl.dismiss(advancedFilter, 'filtrar');
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
