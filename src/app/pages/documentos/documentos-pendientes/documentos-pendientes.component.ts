import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() firmaEvent = new EventEmitter<boolean>();

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

  async showPDF(document: Documento) {
    const modal = await this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        id: document.id,
        firmar: !document.firmado,
        documento: document
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'firmado') {
      this.firmaEvent.emit(true);
      this.loadPendientes();
    }
    else this.firmaEvent.emit(false);
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
