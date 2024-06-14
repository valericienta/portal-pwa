import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermisosPageRoutingModule } from './permisos-routing.module';

import { PermisosPage } from './permisos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermisosListaComponent } from './permisos-pendientes/permisos-pendientes.component';
import { PermisosSolicitarComponent } from './permisos-solicitar/permisos-solicitar.component';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';
import { PermisosHistorialComponent } from './permisos-historial/permisos-historial.component';

const components = [PermisosPage,
  PermisosListaComponent,
  PermisosSolicitarComponent,
  PermisosHistorialComponent]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermisosPageRoutingModule,
    ComponentsModule,
    IonRangeCalendarModule,
  ],
  declarations: [ ... components ],
})
export class PermisosPageModule { }
