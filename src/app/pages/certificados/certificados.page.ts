import { Component, OnInit } from '@angular/core';
import { CertificadoSolicitarComponent } from './certificado-solicitar/certificado-solicitar.component';
import { ModalController } from '@ionic/angular';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Certificado } from 'src/app/models/certificados.model';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { searchResponse } from 'src/app/models/search-response.model';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage implements OnInit {
  certificados: Documento[] = [];

  certIcon: IconName = 'stamp';
  certificadosTitle = {
    title: 'Certificados',
    message: 'Aquí encontrarás todos los certificados.',
    color: '--certificados-accent',
    icon: this.certIcon,
  };

  pagina: number = 0;
  infiniteScroll: any;

  constructor(
    public modalCtrl: ModalController,
    public documentosService: DocumentosService
  ) {}

  ngOnInit(): void {
    this.pagina = 0;
    this.getDocuments();
  }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: CertificadoSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
    }
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

  onIonInfinite(ev: any) {
    this.getDocuments(ev);
  }

  getDocuments(ev?: any) {
    this.pagina++;
    this.documentosService
      .getCertificados(this.pagina, 10)
      .then((data: searchResponse) => {
        if (!data.hasNextPage) this.infiniteScroll.disabled = true;
        data.data.forEach((item: Documento) => {
          console.log(item);
          this.certificados.push(item);
        });
        if (ev) this.infiniteScroll.complete();
      });
  }
}
