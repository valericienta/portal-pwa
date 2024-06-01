import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-documentos-pendientes',
  templateUrl: './documentos-pendientes.component.html',
  styleUrls: ['./documentos-pendientes.component.scss'],
})
export class DocumentosPendientesComponent implements OnInit {
  documentos: Documento[] = [];
  pagina: number = 0;
  filtros: any = {};

  docIcon: IconName = 'folder';
  docTitle = {
    title: 'Documentos',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  constructor(
    public global: GlobalService,
    public modalCtrl: ModalController,
    private documentosService: DocumentosService
  ) { }

  ngOnInit() { }

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

  loadPendientes() {
    this.documentos = [];
    this.documentosService.getDocumentosPendientesTodos().then((data: searchResponse) => {
      data.data.forEach((item: Documento) => {
        this.documentos.push(item);
      });
    });
  }
}
