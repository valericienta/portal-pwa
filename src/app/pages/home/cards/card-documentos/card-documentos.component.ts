import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { Documento } from 'src/app/interfaces/documento.interface';

@Component({
  selector: 'app-card-documentos',
  templateUrl: './card-documentos.component.html',
  styleUrls: ['./card-documentos.component.scss'],
})
export class CardDocumentosComponent implements OnInit {
  @Input() documentos: Documento[] = [];

  docIcon: IconName = 'folder';
  documentosTitle = {
    title: 'Documentos',
    message: '',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  constructor() {}

  ngOnInit() {
    this.documentosTitle.message = this.setMessage();
  }

  setMessage() {
    if (this.documentos.length == 1) {
      return 'Tienes 1 documento pendiente de firma.';
    } else if (this.documentos.length > 1) {
      return 'Tienes ' + this.documentos.length + ' pendientes de firma.';
    } else {
      return 'No tienes documentos pendientes de firma.';
    }
  }
}
