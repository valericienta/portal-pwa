import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';

import { DocumentosPage } from './documentos.page';
import { DocumentosListaComponent } from './documentos-lista/documentos-lista.component';
import { ComponentsModule } from '../../components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FiltrarComponent } from 'src/app/components/filtrar/filtrar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule,
    ComponentsModule  ],
  declarations: [DocumentosPage,
    DocumentosListaComponent
  ],
    providers:[InAppBrowser]
})
export class DocumentosPageModule { }
