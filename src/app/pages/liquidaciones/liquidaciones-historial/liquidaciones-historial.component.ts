import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-liquidaciones-historial',
  templateUrl: './liquidaciones-historial.component.html',
  styleUrls: ['./liquidaciones-historial.component.scss'],
})
export class LiquidacionesHistorialComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de liquidaciones',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };
  liquidaciones: Documento[] = [];
  pagina: number = 0;
  hasNextPage: boolean = true;
  serviceInvoked = false;

  constructor(
    public documentosService: DocumentosService,
    public modalCtrl: ModalController
  ) {
    this.pagina = 0;
    this.liquidaciones = [];
  }

  ngOnInit() {
    this.loadHistorial();
  }

  public loadHistorial() {
    this.hasNextPage = true;
    this.pagina = 0;
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
    if (this.hasNextPage) this.getLiquidaciones(ev);
  }

  private getLiquidaciones(ev?: any) {
    this.pagina++;
    if (this.hasNextPage) {
      this.documentosService
        .getLiquidaciones(this.pagina, 10)
        .then((data: searchResponse) => {
          this.hasNextPage = data.hasNextPage;
          this.serviceInvoked = true;
          data.data.forEach((item: Documento) => {
            this.liquidaciones.push(item);
          });
        });
      if (ev) this.infiniteScroll.complete();
    }
  }
}
