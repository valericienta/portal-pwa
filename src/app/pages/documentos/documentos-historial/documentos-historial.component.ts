import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { GlobalService } from 'src/app/services/global.service';
import { FiltrarComponent } from '../filtrar/filtrar.component';

@Component({
  selector: 'app-documentos-historial',
  templateUrl: './documentos-historial.component.html',
  styleUrls: ['./documentos-historial.component.scss'],
})
export class DocumentosHistorialComponent implements OnInit {
  documentos: Documento[] = [];
  pendientes: any;
  pagina: number = 0;
  filtros: any = {};

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  hasNextPage: boolean = true;

  constructor(
    public global: GlobalService,
    public modalCtrl: ModalController,
    private documentosService: DocumentosService
  ) { }

  ngOnInit() { }


  loadHistorial() {
    console.log('loadHistorial from server');
    this.documentos = [];
    this.pagina = 0;
    this.getDocuments();
  }

  getFiltrados(e: any) {
    this.documentos = [];
    this.pagina = 0;
    this.filtros = e;
  }

  showPDF(document: Documento) {
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

  async onIonInfinite(ev: any) {
    this.getDocuments(ev);
    await (ev as InfiniteScrollCustomEvent).target.complete();
    if (!this.hasNextPage) this.infiniteScroll.disabled = true;
    else this.infiniteScroll.disabled = false;
  }

  getDocuments(ev?: any) {
    this.pagina++;
    this.documentosService.getDocumentosHistorial(this.pagina, 5).then((data: searchResponse) => {     
      data.data.forEach((item: Documento) => {
        this.documentos.push(item);
      });
    });
    // else {
    //   let filtro = {
    //     pageNumber: this.pagina,
    //     pageSize: 5,
    //     orderby: ['fecha DESC'],
    //     tipo: this.filtros.tipo > 0 ? this.filtros.tipo : null,
    //     firmado: this.filtros.firmado == false ? false : null,
    //     advancedFilter: this.filtros.advancedFilter,
    //   };
    //   this.documentosService.search(filtro).then((data: searchResponse) => {
    //     if (!data.hasNextPage) this.infiniteScroll.disabled = true;
    //     data.data.forEach((item: Documento) => {
    //       this.documentos.push(item);
    //     });
    //     if (ev) this.infiniteScroll.complete();
    //   });
    // }
  }

  openModal() {
    this.modalCtrl
      .create({
        component: FiltrarComponent,
        componentProps: {},
      })
      .then((modal) => modal.present());
  }
}
