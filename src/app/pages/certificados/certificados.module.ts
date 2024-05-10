import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificadosPageRoutingModule } from './certificados-routing.module';

import { CertificadosPage } from './certificados.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CertificadoSolicitarComponent } from './certificado-solicitar/certificado-solicitar.component';
import { CertificadoListaComponent } from './certificado-lista/certificado-lista.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CertificadosPage,
     CertificadoSolicitarComponent, 
     CertificadoListaComponent]
})
export class CertificadosPageModule { }
