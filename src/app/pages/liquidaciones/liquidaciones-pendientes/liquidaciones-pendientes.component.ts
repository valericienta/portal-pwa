import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-liquidaciones-pendientes',
  templateUrl: './liquidaciones-pendientes.component.html',
  styleUrls: ['./liquidaciones-pendientes.component.scss'],
})
export class LiquidacionesPendientesComponent implements OnInit {
  @Output() firmaEvent = new EventEmitter<boolean>();
  liqIcon: IconName = 'file-contract';
  liquidacionesTitle = {
    title: 'Liquidaciones',
    message: '',
    color: '--liquidaciones-accent',
    icon: this.liqIcon,
  };
  serviceInvoked = false;
  pendientes: Documento[] = [];
  constructor(
    public documentosService: DocumentosService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getPendientes();
  }

  getPendientes() {
    this.documentosService
      .getLiquidacionesPorFirmar()
      .then((data: searchResponse) => {
        this.serviceInvoked = true;
        data.data.forEach((item: Documento) => {
          this.pendientes.push(item);
        });

        this.setMensaje(this.pendientes.length);
      });
  }

  async showPDF(document: Documento) {
    const modal = await this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        id: document.id,
        firmar: !document.firmado,
        documento: document,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'firmado') {
      this.firmaEvent.emit(true);
      this.getPendientes();
    }
  }

  setMensaje(porFirmarLength: number) {
    if (porFirmarLength > 1)
      this.liquidacionesTitle.message = `Tienes  ${porFirmarLength} documentos pendientes de firma.`;
    else if (porFirmarLength == 1)
      this.liquidacionesTitle.message =
        'Tienes 1 documento pendiente de firma.';
    else if (porFirmarLength == 0)
      this.liquidacionesTitle.message =
        'No tienes documentos pendientes de firma.';
  }
}
