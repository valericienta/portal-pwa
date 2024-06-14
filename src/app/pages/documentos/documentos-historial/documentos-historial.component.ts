import { Component, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  ModalController,
} from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { GlobalService } from 'src/app/services/global.service';
import { FiltrarComponent } from './filtrar/filtrar.component';

@Component({
  selector: 'app-documentos-historial',
  templateUrl: './documentos-historial.component.html',
  styleUrls: ['./documentos-historial.component.scss'],
})
export class DocumentosHistorialComponent implements OnInit {
  documentos: Documento[] = [];
  pendientes: any;
  pagina: number = 1;
  filtros: any = {};
  tipos: any = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  hasNextPage: boolean = true;

  chipsFilters: any = [];
  serviceInvoked = false;
  constructor(
    public global: GlobalService,
    public modalCtrl: ModalController,
    private documentosService: DocumentosService
  ) {
    documentosService.getTipos().then((data) => (this.tipos = data));
  }

  ngOnInit() {}

  loadHistorial() {
    this.documentos = [];
    this.hasNextPage = true;
    this.pagina = 0;
    this.getDocuments();
  }

  verPDF(document: Documento) {
    this.modalCtrl
      .create({
        component: PdfPreviewComponent,
        componentProps: {
          id: document.id,
          firmar: !document.firmado,
          documento: document,
        },
        cssClass: 'modalPDF',
      })
      .then((modal: { present: () => any }) => modal.present());
  }

  onIonInfinite(ev: any) {
    console.log(`scroll`);
    this.getDocuments(ev);
  }

  private getDocuments(ev?: any) {
    console.log(
      `intentará busqueda ${this.hasNextPage} - página a buscar ${
        this.pagina + 1
      }`
    );
    if (this.hasNextPage) {
      let advancedFilter = null;
      this.pagina++;
      if (this.filtros.length > 0)
        advancedFilter = { filters: this.filtros, logic: 'and' };
      this.documentosService
        .getDocumentosHistorial(this.pagina, 5, advancedFilter)
        .then((data: searchResponse) => {
          console.log(
            `fin busqueda: hasNextPage ${this.hasNextPage} - página ${this.pagina}`
          );
          this.serviceInvoked = true;
          data.data.forEach((item: Documento) => {
            this.documentos.push(item);
          });
          this.hasNextPage = data.hasNextPage;
        });
    }
    if (ev) this.infiniteScroll.complete();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FiltrarComponent,
      componentProps: { currentFilter: this.filtros, tipos: this.tipos },
      initialBreakpoint: 0.75,
      breakpoints: [0.75, 1]
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'filtrar') {
      this.filtros = data;
      this.showFilters();
      this.loadHistorial();
    }
  }

  dismissedModal(data: any) {
    this.filtros = data;
    this.showFilters();
    this.loadHistorial();
  }

  showFilters() {
    const filtros = this.filtros;
    this.chipsFilters = [];
    if (filtros) {
      let tipo = filtros.find((x: any) => x.field == 'tipo');
      let referencia = filtros.find((x: any) => x.field == 'nombre');
      let fechas = filtros.filter((x: any) => x.field == 'fecha');
      if (referencia)
        this.chipsFilters.push({
          filterName: 'nombre',
          value: referencia.value,
        });
      if (tipo)
        this.chipsFilters.push({
          filterName: 'tipo',
          value: this.tipos.find((x: any) => x.id === tipo.value).tipo,
        });
      if (fechas.length > 0)
        this.chipsFilters.push({
          filterName: 'fecha',
          value: `Entre ${
            fechas.find((x: any) => x.operator == 'gte').value
          } y ${fechas.find((x: any) => x.operator == 'lte').value}`,
        });
    }
  }

  deleteFilter(filter: any) {
    this.hasNextPage = true;
    this.filtros = this.filtros.filter(
      (x: any) => x.field !== filter.filterName
    );
    this.loadHistorial();
    let index = this.chipsFilters.indexOf(filter);
    if (index !== -1) {
      this.chipsFilters.splice(index, 1);
    }
  }
}
