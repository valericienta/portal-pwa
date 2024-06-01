import { Component, OnInit, ViewChild } from '@angular/core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';
import { DocumentosPendientesComponent } from './documentos-pendientes/documentos-pendientes.component';
import { DocumentosHistorialComponent } from './documentos-historial/documentos-historial.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  histIcon: IconName = 'history';
  historialTitle = {
    title: 'Historial de documentos',
    message: 'Aquí encontraras todos tus documentos.',
    color: '--historial-accent',
    icon: this.histIcon,
  };

  constructor( ) { }
  @ViewChild(DocumentosPendientesComponent) pendientes: DocumentosPendientesComponent;
  @ViewChild(DocumentosHistorialComponent) historial: DocumentosHistorialComponent;
  
  ngOnInit() {

  }

  ionViewWillEnter() { 
    this.pendientes.loadPendientes();
    this.historial.loadHistorial();
  }

}
