import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ControlsModule } from 'src/app/controls/controls.module';
import { CardAccesosComponent } from './card-accesos/card-accesos.component';
import { CardPendientesComponent } from './card-pendientes/card-pendientes.component';
import { CardEventosComponent } from './card-eventos/card-eventos.component';
import { CardVacacionesComponent } from './card-vacaciones/card-vacaciones.component';
import { register } from 'swiper/element/bundle';


register();
const cards = [CardAccesosComponent, CardPendientesComponent, CardEventosComponent, CardVacacionesComponent]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ControlsModule,
    ComponentsModule,
  ],
  declarations: [HomePage, ... cards],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
