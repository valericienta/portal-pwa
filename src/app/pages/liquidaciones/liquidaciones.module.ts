import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidacionesPageRoutingModule } from './liquidaciones-routing.module';
import { LiquidacionesPage } from './liquidaciones.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';
import { LiquidacionesHistorialComponent } from './liquidaciones-historial/liquidaciones-historial.component';
import { LiquidacionesPendientesComponent } from './liquidaciones-pendientes/liquidaciones-pendientes.component';


const components = [LiquidacionesHistorialComponent, LiquidacionesPendientesComponent, LiquidacionesPage]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    LiquidacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [components]
})
export class LiquidacionesPageModule { }
