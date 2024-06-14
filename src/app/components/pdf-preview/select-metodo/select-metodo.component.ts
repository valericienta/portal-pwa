import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { DocumentosService } from 'src/app/services/documentos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-metodo',
  templateUrl: './select-metodo.component.html',
  styleUrls: ['./select-metodo.component.scss'],
})
export class SelectMetodoComponent implements OnInit {
  @ViewChildren(IonInput) inputs: QueryList<IonInput>;
  inputArray = Array(6).fill(0);
  @Output() hideSelectMethod = new EventEmitter<boolean>();
  @Input() id: string;
  codigoSolicitado = false;
  public showAddCode: boolean = false;
  public via: string;

  constructor(
    public global: GlobalService,
    public documentoService: DocumentosService,
    public modalCtrl: ModalController
  ) {
    this.showAddCode = false;
  }

  onInput(event: any, index: number) {
    const inputValue = event.target.value;

    if (inputValue.length === 1 && index < this.inputs.length - 1) {
      const nextInput = this.inputs.toArray()[index + 1];
      nextInput.setFocus();
    }
  }

  async sendCode(via: string) {
    // this.via = via;
    // this.documentoService.getCode(via, this.id).then(() => this.showAddCode = true)
    this.codigoSolicitado = true;
    console.log('codigo solicitado');
  }

  dismiss() {
    this.showAddCode = false;
    this.hideSelectMethod.emit(true);
  }

  hideAddCodeComponent(ev: boolean) {
    this.showAddCode = false;
  }

  ngOnInit() {}
}
