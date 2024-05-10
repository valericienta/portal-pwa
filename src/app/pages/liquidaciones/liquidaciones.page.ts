import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
})
export class LiquidacionesPage implements OnInit {

  constructor(public modalCtrl: ModalController, public documentosService: DocumentosService) { }

  ngOnInit() {

  }

}
