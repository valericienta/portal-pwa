import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCuentaPageRoutingModule } from './mi-cuenta-routing.module';

import { MiCuentaPage } from './mi-cuenta.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PersonalComponent } from './personal/personal.component';
import { ContratoComponent } from './contrato/contrato.component';
import { EditarPersonalComponent } from './personal/editar-personal/editar-personal.component';
import { EditarContratoComponent } from './contrato/editar-contrato/editar-contrato.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MiCuentaPageRoutingModule,
  ],
  declarations: [
    MiCuentaPage,
    ConfiguracionComponent,
    PersonalComponent,
    ContratoComponent,
    EditarPersonalComponent,
    EditarContratoComponent,
  ],
  providers: [InAppBrowser],
})
export class MiCuentaPageModule {}
