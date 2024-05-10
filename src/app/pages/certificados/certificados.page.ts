import { Component, OnInit } from '@angular/core';
import { CertificadoSolicitarComponent } from './certificado-solicitar/certificado-solicitar.component';
import { ModalController } from '@ionic/angular';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage implements OnInit {

  constructor(public modalCtrl: ModalController, public documentosService: DocumentosService) { }

  ngOnInit() {
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

}
