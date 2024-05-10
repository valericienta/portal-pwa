import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { searchResponse } from 'src/app/models/search-response.model';


@Component({
  selector: 'app-documentos-lista',
  templateUrl: './documentos-lista.component.html',
  styleUrls: ['./documentos-lista.component.scss'],
})
export class DocumentosListaComponent implements OnInit {

  documentos: Documento[] = [];
  pagina: number = 0;
  filtros: any = {};
  @Input() pendientes: boolean;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public modalCtrl: ModalController, public documentosService: DocumentosService) {

  }

  addItem(newItem: any) {
    console.log(newItem)
  }

  ngOnInit() {
    this.documentos = [];
    this.pagina = 0;
    this.getDocuments();
  }

  getFiltrados(e: any) {
    this.documentos = [];
    this.pagina = 0;
    this.filtros = e;
    this.getDocuments();
  }

  showPDF(document: Documento) {
    this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        id: document.id,
        firmar: !document.firmado,
        documento: document
      },
      cssClass: 'modalPDF'
    }).then((modal) => modal.present())
  }

  onIonInfinite(ev: any) {
    this.getDocuments(ev);
  }

  getDocuments(ev?: any) {
    this.pagina++;
    if (this.pendientes)
      this.documentosService.getPendientes().then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.documentos.push(item)
        });
        if (ev) this.infiniteScroll.complete();
      })
    else {
      let filtro = {
        pageNumber: this.pagina,
        pageSize: 10,
        orderby: ["fecha DESC"],
        tipo: this.filtros.tipo > 0 ? this.filtros.tipo : null,
        firmado: this.filtros.firmado == false ? false : null,
        advancedFilter: this.filtros.advancedFilter
      }
      
      this.documentosService.search(filtro).then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.documentos.push(item)
        });
        if (ev) this.infiniteScroll.complete();
      })
    }


  }
}