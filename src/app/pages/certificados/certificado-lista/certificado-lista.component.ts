import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-certificado-lista',
  templateUrl: './certificado-lista.component.html',
  styleUrls: ['./certificado-lista.component.scss'],
})
export class CertificadoListaComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Output() LoadCertificadosEmitter: EventEmitter<number> = new EventEmitter();
  certificados: Documento[] = [];
  pagina: number = 1;
  hasNextPage: boolean = true;

  constructor(public documentosService: DocumentosService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.pagina = 1;
    this.getDocuments()
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
    if (this.hasNextPage) this.getDocuments(ev);
  }

 private getDocuments(ev?: any) {
    this.documentosService.getCertificados(this.pagina, 10).then((data: searchResponse) => {
      this.pagina++;
      this.hasNextPage = data.hasNextPage;
      this.LoadCertificadosEmitter.emit(data.totalCount);
      data.data.forEach((item: Documento) => {         
        this.certificados.push(item)
      });
    })
  }

  public getCertificados(){
    this.pagina = 1;
    this.certificados= [];
    this.getDocuments();
  }
}
