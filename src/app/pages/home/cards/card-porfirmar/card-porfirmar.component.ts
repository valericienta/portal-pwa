import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-porfirmar',
  templateUrl: './card-porfirmar.component.html',
  styleUrls: ['./card-porfirmar.component.scss'],
})
export class CardPorfirmarComponent implements OnInit {

  documentos: Documento[];
  constructor(public documentosService: DocumentosService,
     public modalCtrl: ModalController,
     public global: GlobalService) {
    this.documentos = [];
    this.getPendientes();
  }

  ngOnInit() {

  }

  getPendientes() {
    this.documentosService.getPendientes(1, 5).then(data => this.documentos = data.data)
  }

  showPDF(item: Documento) {
    this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        documento: item,
        id: item.id,
        firmar: !item.firmado
      },
    }).then((modal) => modal.present())
  }
}
