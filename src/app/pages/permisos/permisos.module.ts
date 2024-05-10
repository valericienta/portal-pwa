import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermisosPageRoutingModule } from './permisos-routing.module';

import { PermisosPage } from './permisos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermisosListaComponent } from './permisos-lista/permisos-lista.component';
import { PermisosSolicitarComponent } from './permisos-solicitar/permisos-solicitar.component';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermisosPageRoutingModule,
    ComponentsModule,
    IonRangeCalendarModule
  ],
  declarations: [PermisosPage, PermisosListaComponent, PermisosSolicitarComponent]
})
export class PermisosPageModule {}
