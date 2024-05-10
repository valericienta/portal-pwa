import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-certificado-lista',
  templateUrl: './certificado-lista.component.html',
  styleUrls: ['./certificado-lista.component.scss'],
})
export class CertificadoListaComponent  implements OnInit {
  certificados: Documento[] = [];
  pagina: number=0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public documentosService: DocumentosService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.pagina=0;
    this.getDocuments()
  }

  showPDF(document: Documento) {
    this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps:{
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
      this.documentosService.getCertificados(this.pagina, 10).then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.certificados.push(item)
        });
        if (ev) this.infiniteScroll.complete();
      }) 
  }
}
