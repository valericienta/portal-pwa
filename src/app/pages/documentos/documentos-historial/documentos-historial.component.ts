import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
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

  constructor(
    private route: ActivatedRoute,
    public global: GlobalService,
    public modalCtrl: ModalController,
    private documentosService: DocumentosService
  ) {}

  ngOnInit() {
    let tipo = this.route.snapshot.paramMap.get('tipo');
    if (tipo == 'P') this.pendientes = true;
    else this.pendientes = false;

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

  onIonInfinite(ev: any) {
    this.getDocuments(ev);
  }

  getDocuments(ev?: any) {
    // OBTENER HISTORIAL DE DOCUMENTOS YA FIRMADOS, MÉTODO ÚNICO?
    this.pagina++;
    if (this.pendientes)
      this.documentosService.getPendientes().then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.documentos.push(item);
        });
        if (ev) this.infiniteScroll.complete();
      });
    else {
      let filtro = {
        pageNumber: this.pagina,
        pageSize: 5,
        orderby: ['fecha DESC'],
        tipo: this.filtros.tipo > 0 ? this.filtros.tipo : null,
        firmado: this.filtros.firmado == false ? false : null,
        advancedFilter: this.filtros.advancedFilter,
      };
      this.documentosService.search(filtro).then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.documentos.push(item);
        });
        if (ev) this.infiniteScroll.complete();
      });
    }
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
