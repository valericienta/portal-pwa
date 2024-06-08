import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';

import { DocumentosPage } from './documentos.page';
import { ComponentsModule } from '../../components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FiltrarComponent } from 'src/app/pages/documentos/documentos-historial/filtrar/filtrar.component';
import { DocumentosPendientesComponent } from './documentos-pendientes/documentos-pendientes.component';
import { DocumentosHistorialComponent } from './documentos-historial/documentos-historial.component';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule,
    ComponentsModule,
    IonRangeCalendarModule
  ],
  declarations: [
    DocumentosPage,
    DocumentosPendientesComponent,
    DocumentosHistorialComponent,
    FiltrarComponent
  ],
  providers: [InAppBrowser],
})
export class DocumentosPageModule {}
