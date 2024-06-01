import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';

@Component({
  selector: 'app-card-documentos',
  templateUrl: './card-documentos.component.html',
  styleUrls: ['./card-documentos.component.scss'],
})
export class CardDocumentosComponent implements OnInit {
  @Input() documentos: Documento[];

  docIcon: IconName = 'folder';
  documentosTitle = {
    title: 'Documentos',
    message: '',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.documentosTitle.message = this.setMessage();
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

  setMessage() {
    if (this.documentos.length == 1) {
      return 'Tienes 1 documento pendiente de firma.';
    } else if (this.documentos.length > 1) {
      return 'Tienes ' + this.documentos.length + ' pendientes de firma.';
    } else {
      return 'No tienes documentos pendientes de firma.';
    }
  }
}
