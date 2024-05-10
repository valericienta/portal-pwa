import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DocumentosService } from 'src/app/services/documentos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-metodo',
  templateUrl: './select-metodo.component.html',
  styleUrls: ['./select-metodo.component.scss'],
})
export class SelectMetodoComponent implements OnInit {
  @Output() hideSelectMethod = new EventEmitter<boolean>();
  @Input() id: string='';
  public showAddCode: boolean = false;
  public via: string='';

  constructor(public global: GlobalService,
    public documentoService: DocumentosService,
    public modalCtrl: ModalController) {
    this.showAddCode = false;
  }

  async sendCode(via: string) {
    this.via = via;
    this.documentoService.getCode(via, this.id).then(() => this.showAddCode = true)
  }

  dismiss() {
    this.showAddCode = false;
    this.hideSelectMethod.emit(true);
  }

  hideAddCodeComponent(ev: boolean) {
    this.showAddCode = false;
  }

  ngOnInit() {
    console.log(this.id)
  }

}
