import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../../../services/documentos.service';
import { Documento } from 'src/app/interfaces/documento.interface';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { GlobalService } from 'src/app/services/global.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-card-liquidaciones',
  templateUrl: './card-liquidaciones.component.html',
  styleUrls: ['./card-liquidaciones.component.scss'],
})
export class CardLiquidacionesComponent implements OnInit {
  liquidaciones: Documento[] = [];

  liqIcon: IconName = 'file-contract';
  liqSection = {
    title: 'Liquidaciones',
    message: 'No tienes documentos pendientes de firma',
    color: '--liquidaciones-accent',
    icon: this.liqIcon,
  };

  constructor(
    public documentosService: DocumentosService,
    public modalCtrl: ModalController,
    public global: GlobalService
  ) {
    this.documentosService
      .getLiquidaciones(1, 3)
      .then((data) => (this.liquidaciones = data.data));
  }

  ngOnInit() {}

  showPDF(item: Documento) {
    this.modalCtrl
      .create({
        component: PdfPreviewComponent,
        componentProps: {
          documento: item,
          id: item.id,
          from: 'home-liquidaciones',
          firmar: !item.firmado,
        },
      })
      .then((modal) => modal.present());
  }
}
