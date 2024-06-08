import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TiposCertificado } from 'src/app/interfaces/tipos-certificado.interface';
import { ToastService } from 'src/app/services/toast.service';
import { DocumentosService } from '../../../services/documentos.service';
import { Certificado } from 'src/app/models/certificados.model';
import { Documento } from 'src/app/interfaces/documento.interface';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';

@Component({
  selector: 'app-certificado-solicitar',
  templateUrl: './certificado-solicitar.component.html',
  styleUrls: ['./certificado-solicitar.component.scss'],
})
export class CertificadoSolicitarComponent implements OnInit {

  tipos: TiposCertificado[] = [];
  certificado: Certificado;
  constructor(
    public toastService: ToastService,
    public documentosService: DocumentosService,
    public modalCtrl: ModalController
  ) {
    this.getTipos();
    this.certificado = new Certificado();
  }

  ngOnInit() { }

  getTipos() {
    this.documentosService.getTiposCertificados().then((data) => {
      this.tipos = data;
    });
  }

  selectTipo(id: any) {
    this.certificado.idFormato = id;
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  solicitar() {
    this.documentosService
      .solicitarCertificado(this.certificado.idFormato)
      .then((data: any) => {
        this.modalCtrl.dismiss(null, 'save');
      });
  }

}
