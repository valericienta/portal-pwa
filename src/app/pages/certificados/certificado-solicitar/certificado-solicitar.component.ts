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
  constructor(public toastService: ToastService,
    public documentosService: DocumentosService,
    public modalCtrl: ModalController) {
    this.getTipos();
    this.certificado = new Certificado();

  }

  ngOnInit() { }

  getTipos() {
    this.documentosService.getTiposCertificados().then(data => {
      this.tipos = data;
    })
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  solicitar() {

    let nombre = (this.tipos.find(x => x.id == this.certificado.idFormato))?.nombre;


    this.documentosService.solicitarCertificado(this.certificado.idFormato)
      .then((data: any) => {
        let documento = {
          tipo: nombre,
          id: data.data
        }
        this.showPDF(documento);
      })
  }

  showPDF(item: Documento) {
    this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        documento: item,
        id: item.id,
        firmar: false
      },
      cssClass: 'modalPDF'
    }).then((modal) => modal.present())
  }
}
