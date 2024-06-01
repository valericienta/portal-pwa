import { Component, OnInit, ViewChild } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';

import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
})
export class LiquidacionesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  firmados: Documento[] = [];
  porFirmar: Documento[] = [];

  liqIcon: IconName = 'file-contract';
  liquidacionesTitle = {
    title: 'Liquidaciones',
    message: '',
    color: '--liquidaciones-accent',
    icon: this.liqIcon,
  };

  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de liquidaciones',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };

  liquidaciones: Documento[] = [];

  pagina: number = 0;

  constructor(
    public documentosService: DocumentosService,
    public modalCtrl: ModalController
  ) {
    this.pagina = 0;
    this.liquidaciones = [];
  }

  ngOnInit() {
    this.getPendientes();
    this.getLiquidaciones();
  }

  showPDF(item: Documento) {
    this.modalCtrl
      .create({
        component: PdfPreviewComponent,
        componentProps: {
          documento: item,
          id: item.id,
          firmar: !item.firmado,
        },
        cssClass: 'modalPDF',
      })
      .then((modal) => modal.present());
  }

  onIonInfinite(ev: any) {
    this.getLiquidaciones(ev);
  }

  getPendientes() {
    this.documentosService
      .getLiquidacionesPorFirmar()
      .then((data: searchResponse) => {
        data.data.forEach((item: Documento) => {
          this.porFirmar.push(item);
        });

        this.setMensaje(this.porFirmar.length);
      });
  }
  
  getLiquidaciones(ev?: any) {
    this.pagina++;

    this.documentosService
      .getLiquidacionesFirmadas(this.pagina, 5)
      .then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          this.firmados.push(item);
        });
        this.setMensaje(this.porFirmar.length);
        if (ev) this.infiniteScroll.complete();
      });
  }

  setMensaje(porFirmarLength: number) {
    if (porFirmarLength > 1) {
      this.liquidacionesTitle.message =
        'Tienes ' + porFirmarLength + ' documentos pendientes de firma.';
    } else if (porFirmarLength == 1) {
      this.liquidacionesTitle.message =
        'Tienes 1 documento pendiente de firma.';
    } else if (porFirmarLength == 0) {
      this.liquidacionesTitle.message =
        'No tienes documentos pendientes de firma.';
    }
  }
}
