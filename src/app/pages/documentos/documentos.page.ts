import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  docIcon: IconName = 'folder';
  documentosTitle = {
    title: 'Documentos',
    message: 'Documentos pendientes de firma.',
    color: '--documentos-accent',
    icon: this.docIcon,
  };

  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de documentos',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };

  pendientes: boolean = true;
  constructor(private route: ActivatedRoute, public global: GlobalService) {}

  ngOnInit() {
    let tipo = this.route.snapshot.paramMap.get('tipo');
    if (tipo == 'P') this.pendientes = true;
    else this.pendientes = false;
  }
}
