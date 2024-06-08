import { Component, OnInit, ViewChild } from '@angular/core';
import { CertificadoSolicitarComponent } from './certificado-solicitar/certificado-solicitar.component';
import { ModalController } from '@ionic/angular';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { CertificadoListaComponent } from './certificado-lista/certificado-lista.component';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage implements OnInit {
  @ViewChild(CertificadoListaComponent) certificados: CertificadoListaComponent;

  cantidad: number = 1000;
  certIcon: IconName = 'stamp';
  certificadosTitle = {
    title: 'Certificados',
    message: 'Aquí encontrarás todos tus certificados.',
    color: '--certificados-accent',
    icon: this.certIcon,
  };

  pagina: number = 0;
  infiniteScroll: any;

  constructor(public modalCtrl: ModalController, public documentosService: DocumentosService) { }

  ngOnInit(): void {
    this.cantidad=1000;
    this.pagina = 0;
  }

  async showSolicitar() {
    const modal = await this.modalCtrl.create({
      component: CertificadoSolicitarComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'save') {
      this.certificados.getCertificados();
    }
  }

  checkCertificadosLength(e: any) {
    this.cantidad= e;
  }
}
