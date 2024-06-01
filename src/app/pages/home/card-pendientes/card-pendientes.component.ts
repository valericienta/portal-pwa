import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-card-pendientes',
  templateUrl: './card-pendientes.component.html',
  styleUrls: ['./card-pendientes.component.scss'],
})
export class CardPendientesComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Output() cntdocumentosEmit = new EventEmitter<number>();

  docIcon: IconName = 'folder';
  documentosTitle = {
    title: 'Documentos',
    message: '',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  documentos: Documento[] = [];
  cntdocumentospendientes: number;
  pagina: number = 0;
  hasNextPage: boolean = true;
  constructor(private modalCtrl: ModalController, public documentosService: DocumentosService) { }

  ngOnInit() {

  }

  getPendientesFirma() {
    this.pagina = 0;
    this.documentos = [];
    this.infiniteScroll.disabled = false;
    console.log(`Pagina: ${this.pagina} | scroll Disabled : ${this.infiniteScroll.disabled}`)
    this.getPendientes();
  }

  private getPendientes(ev?: any) {
    this.pagina++;
    this.documentosService.getPendientes(this.pagina, 5).then((data: searchResponse) => {
      this.cntdocumentospendientes = data.totalCount;
      this.documentosTitle.message = this.setMessage();
      this.cntdocumentosEmit.emit(this.cntdocumentospendientes);
      this.hasNextPage = data.hasNextPage;
      data.data.forEach((item: Documento) => {
        this.documentos.push(item);
      });

    });
  }

  async onIonInfinite(ev: any) {
    this.getPendientes(ev);
    await (ev as InfiniteScrollCustomEvent).target.complete();
    if (!this.hasNextPage) this.infiniteScroll.disabled = true;
    else this.infiniteScroll.disabled = false;
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
      .then((modal) => modal.present());
  }

  private setMessage() {
    if (this.cntdocumentospendientes == 1) {
      return 'Tienes 1 documento pendiente de firma.';
    } else if (this.cntdocumentospendientes > 1) {
      return 'Tienes ' + this.cntdocumentospendientes + ' pendientes de firma.';
    } else {
      return 'No tienes documentos pendientes de firma.';
    }
  }


}
