import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';

import { DocumentosPage } from './documentos.page';
import { DocumentosListaComponent } from './documentos-lista/documentos-lista.component';
import { ComponentsModule } from '../../components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule,
    ComponentsModule,
    IonRangeCalendarModule,
  ],
  declarations: [DocumentosPage, DocumentosListaComponent, FiltrarComponent],
  providers: [InAppBrowser],
})
export class DocumentosPageModule {}
