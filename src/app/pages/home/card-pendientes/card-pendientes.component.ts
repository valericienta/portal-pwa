import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PdfPreviewComponent } from 'src/app/components/pdf-preview/pdf-preview.component';
import { Documento } from 'src/app/interfaces/documento.interface';
import { searchResponse } from 'src/app/models/search-response.model';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-card-pendientes',
  templateUrl: './card-pendientes.component.html',
  styleUrls: ['./card-pendientes.component.scss'],
})
export class CardPendientesComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Output() cntdocumentosEmit = new EventEmitter<number>();

  docIcon: IconName = 'folder';
  documentosTitle = {
    title: 'Documentos',
    message: '',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  alDiaIcon: IconName = 'badge-check';
  alDiaSection = {
    title: '¡Estás al día!',
    message: 'No tienes documentos ni solicitudes pendientes.',
    color: '--aldia-accent',
    icon: this.alDiaIcon,
  };

  documentos: Documento[] = [];
  cntdocumentospendientes: number;
  pagina: number = 0;
  hasNextPage: boolean = true;

  serviceInvoked: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    public documentosService: DocumentosService
  ) { }

  ngOnInit() {
  }

  getPendientesFirma() {
    this.serviceInvoked = false;
    this.pagina = 1;
    this.hasNextPage = true;
    this.documentos = [];
    this.getPendientes();
  }

  getPendientes(ev?: any) {
    if (this.hasNextPage) {
      this.documentosService
        .getPendientes(this.pagina, 5)
        .then((data: searchResponse) => {
          this.serviceInvoked = true;
          this.pagina++;
          this.cntdocumentospendientes = data.totalCount;
          this.documentosTitle.message = this.setMessage();
          this.hasNextPage = data.hasNextPage;
          data.data.forEach((item: Documento) => {
            this.documentos.push(item);
          });
          if (ev) this.infiniteScroll.complete();
        });
    }
  }

  async onIonInfinite(ev: any) {
    if (this.hasNextPage) this.getPendientes(ev);
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
      this.getPendientesFirma();
    }
  }

  private setMessage() {
    if (this.cntdocumentospendientes == 1) {
      return 'Tienes 1 documento pendiente de firma.';
    } else if (this.cntdocumentospendientes > 1) {
      return 'Tienes ' + this.cntdocumentospendientes + ' pendientes de firma.';
    } else {
      return 'No tienes documentos pendientes de firma.';
    }
  }
}
