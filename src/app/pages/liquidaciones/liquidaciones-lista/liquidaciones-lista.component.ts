import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { searchResponse } from 'src/app/models/search-response.model';

@Component({
  selector: 'app-liquidaciones-lista',
  templateUrl: './liquidaciones-lista.component.html',
  styleUrls: ['./liquidaciones-lista.component.scss'],
})
export class LiquidacionesListaComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  liquidaciones: Documento[] = []
  pagina: number = 0;

  constructor(public documentosService: DocumentosService,
    public modalCtrl: ModalController) {
    this.pagina = 0;
    this.liquidaciones = [];
  }

  ngOnInit() {
    this.getLiquidaciones();
  }

  showPDF(item: Documento) {
    this.modalCtrl.create({
      component: PdfPreviewComponent,
      componentProps: {
        documento: item,
        id: item.id,
        firmar: !item.firmado
      },
      cssClass: 'modalPDF'
    }).then((modal) => modal.present())
  }

  onIonInfinite(ev: any) {
    this.getLiquidaciones(ev);
  }

  getLiquidaciones(ev?: any) {
    this.pagina++;

    this.documentosService.getLiquidaciones(this.pagina, 10).then((data: searchResponse) => {
      if (!data.hasNextPage) this.infiniteScroll.disabled = true;
      data.data.forEach((item: Documento) => {
        this.liquidaciones.push(item)
      });
      if (ev) this.infiniteScroll.complete();
    })
  }
}
